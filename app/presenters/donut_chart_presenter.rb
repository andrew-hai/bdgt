class DonutChartPresenter
  def self.category_by_last(options = {})
    query = Cost.order('costs.id DESC')
    if options[:period].present?
      query = query.where(spent_on: (Date.current - options[:period].to_i.days)..Date.current)
    end

    query.includes(:cost_category)
      .group_by { |c| c.cost_category.name }
      .map { |k, v| { label: k, value: v.sum(&:amount) } }
  end
end
