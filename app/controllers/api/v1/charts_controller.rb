module Api::V1
  class ChartsController < Api::ApplicationController
    def bar_month_by_category
      render json: BarChartPresenter.month_by_category(filter_params)
    end

    def area_last_days_costs
      render json: AreaChartPresenter.last_days_costs(filter_params)
    end

    def donut_category_by_last
      render json: DonutChartPresenter.category_by_last(filter_params)
    end

    private def filter_params
      params.permit(:category_id, :month, :period)
    end
  end
end
