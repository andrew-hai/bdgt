class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :authenticate_user!

  layout 'authorized'

  private def expire_last_cost_fragments
    expire_fragment(%r{last_cost\..*})
  end

  private def expire_fund_change_fragments
    expire_fragment(%r{fund_change\..*})
  end
end
