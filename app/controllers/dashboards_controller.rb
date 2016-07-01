class DashboardsController < ApplicationController
  def index
    @costs = Cost.includes(:user).limit(20)
  end

  def sample; end
end
