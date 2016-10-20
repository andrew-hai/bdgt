class ChartPresenter
  def self.donut_data
    Cost.order('costs.id DESC')
      .includes(:cost_category)
      .group_by { |c| c.cost_category.name }
      .map { |k, v| { label: k, value: v.sum(&:amount) } }
  end
end
