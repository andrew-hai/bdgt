module React::V1
  class AudiosController < React::ApplicationController
    def index
      render json: Audio.order(artist: :asc, title: :asc).all.as_json
    end
  end
end
