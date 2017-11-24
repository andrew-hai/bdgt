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

  config.sort_order = 'title_asc'

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
    if params[:truncate] == 'true'
      Audio.destroy_all
    end

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
          track_number: combined_value(id_3_tag.track_nr.to_i, fileref.tag.track.to_i),
          genre: combined_value(id_3_tag.genre, fileref.tag.genre),
          duration: fileref.audio_properties.length
        )
      end
    end

    render json: true
  end

  controller do
    def combined_value(val1, val2)
      if val1.present? && val2.present? && val1 != val2
        "#{val1}, #{val2}"
      else
        val1.presence || val2
      end
    end
  end
end
