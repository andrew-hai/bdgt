class DashboardsController < ApplicationController
  def index
    @costs = Cost.includes(:user).order('costs.id DESC').limit(20)

    data = Cost.where(spent_on: (Date.current - 30.days)..Date.current)
      .order('costs.id DESC').group_by { |c| c.spent_on.to_s }
    @js_area_chart_data = ((Date.current - 30.days)..Date.current).map do |date|
      { 'spent_on' => date.to_s }.tap do |o|
        CostCategory.all.each do |category|
          if data[date.to_s]
            costs = data[date.to_s].select { |c| c.cost_category_id == category.id }
            o["category_#{category.id}"] = costs.sum(&:amount)
          else
            o["category_#{category.id}"] = 0
          end
        end
      end
    end

    @js_donut_chart_data = Cost.order('costs.id DESC')
      .includes(:cost_category)
      .group_by { |c| c.cost_category.name }
      .map { |k, v| { label: k, value: v.sum(&:amount) } }
  end

  def sample; end
end
