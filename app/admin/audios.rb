require 'taglib'

ActiveAdmin.register Audio do
  permit_params :artist,
                :title,
                :album,
                :year,
                :track_number,
                :genre,
                :duration,
                :file

  config.sort_order = 'artist_asc'

  index do
    selectable_column
 
    id_column

    column :artist
    column :title
    column :album
    column :year
    column :track_number
    column :genre
    column :duration

    actions
  end

  filter :artist
  filter :title
  filter :album
  filter :year
  filter :track_number
  filter :genre
  filter :duration

  collection_action :seed, method: :get do
    files = Dir.entries("#{Rails.root}/public/media").select { |filename| filename =~ /\.mp3|\.flac/i }

    files.each do |file|
      id_3_tag = ID3Tag.read(File.open("#{Rails.root}/public/media/#{file}", 'rb'))
      TagLib::FileRef.open("#{Rails.root}/public/media/#{file}") do |fileref|

        Audio.create(
          file: File.open("#{Rails.root}/public/media/#{file}"),
          artist: combined_value(id_3_tag.artist, fileref.tag.artist),
          title: combined_value(id_3_tag.title, fileref.tag.title),
          album: combined_value(id_3_tag.album, fileref.tag.album),
          year: combined_value(id_3_tag.year, fileref.tag.year),
          track_number: [id_3_tag.track_nr.try(:to_i), fileref.tag.track.try(:to_i)].detect{|n| n > 0},
          genre: combined_value(id_3_tag.genre, fileref.tag.genre),
          duration: fileref.audio_properties.length
        )
      end
    end

    render json: true
  end

  collection_action :upload_form, method: :get do
  end

  collection_action :upload, method: :post do
    files = params[:audio][:files]

    files.each do |file|
      id_3_tag = ID3Tag.read(File.open(file.tempfile.path, 'rb'))
      TagLib::FileRef.open(file.tempfile.path) do |fileref|

        begin
          Audio.create(
            file: File.open(file.tempfile.path),
            artist: combined_value(id_3_tag.artist, fileref.tag.artist),
            title: combined_value(id_3_tag.title, fileref.tag.title),
            album: combined_value(id_3_tag.album, fileref.tag.album),
            year: combined_value(id_3_tag.year, fileref.tag.year),
            track_number: [id_3_tag.track_nr.try(:to_i), fileref.tag.track.try(:to_i)].detect{|n| n > 0},
            genre: combined_value(id_3_tag.genre, fileref.tag.genre),
            duration: fileref.audio_properties.length
          )
        rescue
          Audio.create(
            file: File.open(file.tempfile.path),
            artist: fileref.tag.artist,
            title: fileref.tag.title,
            album: fileref.tag.album,
            year: fileref.tag.year,
            track_number: fileref.tag.track.try(:to_i),
            genre: fileref.tag.genre,
            duration: fileref.audio_properties.length
          )
        end
      end
    end

    render json: true
  end

  controller do
    def combined_value(val1, val2)
      if val1.present? && val2.present? && val1 != val2
        "#{val1}, #{val2}"
      else
        (val1.presence || val2).to_s
      end
    end
  end
end
