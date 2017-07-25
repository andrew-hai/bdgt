module Kodi::V1
  class VideosController < Kodi::ApplicationController
    def index
      render json: presenter.transform_all(Video.all)
    end

    def search
      render json: presenter.transform_all(Video.where('id > 0'))
    end

    def show
      render json: presenter.transform(video)
    end

    def root_directory
      render json: VideoPresenter.default_directories
    end

    private def video
      @video ||= Video.find(params[:id])
    end

    private def presenter
      @presenter ||= VideoPresenter.new(self, filter_params)
    end

    private def filter_params
      params.permit(:season)
    end
  end
end
