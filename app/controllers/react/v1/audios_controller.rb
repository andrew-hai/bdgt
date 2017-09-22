module React::V1
  class AudiosController < React::ApplicationController
    before_action do
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
      headers['Access-Control-Request-Method'] = '*'
      headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    end

    def index
      a = Audio.order(author: :asc, name: :asc).all
        .as_json(only: [:id, :name, :author], methods: [:file_url])

      a.each { |o| o.merge!(img: 'http://www.material-ui.com/images/grid-list/00-52-29-429_640.jpg') }

      b = a * 11

      c = []
      0.upto(21) do |i|
        c[i] = b[i].merge(key: i)
      end

      render json: c
    end
  end
end
