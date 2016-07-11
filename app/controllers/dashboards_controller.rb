class DashboardsController < ApplicationController
  def index
    @costs = Cost.includes(:user).order('costs.id DESC').limit(20)
  end

  def sample; end
end
