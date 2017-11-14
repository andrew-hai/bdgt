require 'taglib'

module React::V1
  class AudiosController < React::ApplicationController
    before_action only: [:index] do
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    end

    def index
      render json: Audio.order(artist: :asc, title: :asc).all.as_json
    end

    def seed
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

    private def combined_value(val1, val2)
      if val1.present? && val2.present? && val1 != val2
        "#{val1}, #{val2}"
      else
        val1.presence || val2
      end
    end
  end
end
