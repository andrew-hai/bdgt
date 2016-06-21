class DashboardsController < ApplicationController
  def index
    @costs = Cost.includes(:user).all
  end

  def sample; end
end
