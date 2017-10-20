module React::V1
  class AudiosController < React::ApplicationController
    before_action do
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    end

    def index
      a = Audio.order(title: :asc).all.as_json(methods: [:file_url])
        .each { |o| o.merge!(img: 'http://www.material-ui.com/images/grid-list/00-52-29-429_640.jpg') }

      render json: a
    end

    def seed
      mp3s = Dir.entries("#{Rails.root}/public/media").select { |filename| filename =~ /\.mp3/i }

      mp3s.each do |file|
        ID3Tag.read(File.open("#{Rails.root}/public/media/#{file}", 'rb')) do |tag|
          
          a = Audio.create(
            file: File.open("#{Rails.root}/public/media/#{file}"),
            artist: tag.artist,
            title: tag.title,
            album: tag.album,
            year: tag.year,
            track_number: tag.track_nr,
            genre: tag.genre,
            content: tag.get_frame(:TIT2).content,
            content2: tag.get_frames(:COMM).first.try(:content),
            language: tag.get_frames(:COMM).last.try(:language)
          )
          binding.pry
        end
      end

      render json: true
    end
  end
end
