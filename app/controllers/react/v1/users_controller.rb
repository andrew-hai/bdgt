module React::V1
  class UsersController < React::ApplicationController
    def current
      render json: (current_user || {})
        .as_json(only: [:id, :username, :email, :admin])
        .merge(form_token: form_authenticity_token)
    end
  end
end
