class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :authenticate_user!

  layout 'authorized'

  def last_cost
    @last_cost ||= Cost.order(updated_at: :desc).first
  end
  helper_method :last_cost
end
