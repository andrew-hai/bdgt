class BarChartPresenter
  def self.month_by_category(params = {})
    date = DateTime.current - params[:month].to_i.month

    data = Cost.select('SUM(amount) as month_amount, cost_category_id')
      .where(spent_on: date.beginning_of_month..date.end_of_month)
      .group(:cost_category_id)

    CostCategory.order(:name).map do |category|
      c_data = data.detect { |d| d.cost_category_id == category.id }
      { category: category.name, month_amount: c_data.try(:month_amount) || 0 }
    end
  end
end
