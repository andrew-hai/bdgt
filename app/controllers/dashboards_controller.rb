class DashboardsController < ApplicationController
  def index
    @costs = Cost.includes(:user).order('costs.id DESC').limit(20)
    @grouped = Fund.group(:currency).sum(:amount)
  end

  def sample; end

  private def js_area_chart_data
    @js_area_chart_data ||= ChartPresenter.area_data
  end
  helper_method :js_area_chart_data

  private def js_donut_chart_data
    @js_donut_chart_data ||= ChartPresenter.donut_data
  end
  helper_method :js_donut_chart_data
end
