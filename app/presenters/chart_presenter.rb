class ChartPresenter
  def self.area_data
    data = Cost.where(spent_on: (Date.current - 30.days)..Date.current)
      .order('costs.id DESC').group_by { |c| c.spent_on.to_s }

    cost_categories = CostCategory.all
    
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

  def self.donut_data
    Cost.order('costs.id DESC')
      .includes(:cost_category)
      .group_by { |c| c.cost_category.name }
      .map { |k, v| { label: k, value: v.sum(&:amount) } }
  end
end
