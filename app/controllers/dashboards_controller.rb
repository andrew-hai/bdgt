class DashboardsController < ApplicationController
  def index
    @costs = Cost.includes(:user, :cost_category)
      .order('costs.id DESC').limit(20)
  end

  def sample; end

  private def js_area_chart_data
    @js_area_chart_data ||= ChartPresenter.area_data
  end
  helper_method :js_area_chart_data

  private def js_bar_chart_data
    @js_bar_chart_data ||= BarChartPresenter.month_by_category
  end
  helper_method :js_bar_chart_data

  private def js_donut_chart_data
    @js_donut_chart_data ||= ChartPresenter.donut_data
  end
  helper_method :js_donut_chart_data
end
