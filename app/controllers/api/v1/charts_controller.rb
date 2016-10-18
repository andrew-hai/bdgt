module Api::V1
  class ChartsController < Api::ApplicationController
    def bar_month_by_category
      render json: BarChartPresenter.month_by_category(month_param)
    end

    private def month_param
      params.permit(:month)
    end
  end
end
