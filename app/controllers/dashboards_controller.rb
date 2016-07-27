class DashboardsController < ApplicationController
  def index
    @costs = Cost.includes(:user).order('costs.id DESC').limit(20)
    @grouped = Fund.group(:currency).sum(:amount)
    @js_area_chart_data = ChartPresenter.area_data
    @js_donut_chart_data = ChartPresenter.donut_data
  end

  def sample; end
end
