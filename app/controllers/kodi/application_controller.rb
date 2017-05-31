module Kodi
  class ApplicationController < ActionController::API

    private def image_url(image_path, options = {})
      ActionController::Base.helpers.image_url(image_path, options)
    end
  end
end
