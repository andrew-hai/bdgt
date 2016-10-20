class AreaChartPresenter
  def self.last_days_costs(options = {})
    query = Cost.where(spent_on: (Date.current - 30.days)..Date.current)
    query = query.where(cost_category_id: options[:category_id]) if options[:category_id].present?

    data =  query.group_by { |c| c.spent_on.to_s }

    cost_categories = CostCategory.order(:name)

    ((Date.current - 30.days)..Date.current).map do |date|
      { spent_on: I18n.l(date, format: :short) }.tap do |o|
        cost_categories.each do |category|
          if data[date.to_s]
            costs = data[date.to_s].select { |c| c.cost_category_id == category.id }
            o["category_#{category.id}"] = costs.sum(&:amount)
          else
            o["category_#{category.id}"] = 0
          end
        end
      end
    end
  end
end
