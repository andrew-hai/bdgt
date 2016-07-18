class DashboardsController < ApplicationController
  def index
    @costs = Cost.includes(:user).order('costs.id DESC').limit(20)
    @data = Cost.where(spent_on: (Date.current - 30.days)..Date.current)
      .order('costs.id DESC').group_by { |c| c.spent_on.to_s }

    @js_data = ((Date.current - 30.days)..Date.current).map do |date|
      { 'spent_on' => date.to_s }.tap do |o|
        CostCategory.all.each do |category|
          if @data[date.to_s]
            costs = @data[date.to_s].select { |c| c.cost_category_id == category.id }
            o["category_#{category.id}"] = costs.sum(&:amount)
          else
            o["category_#{category.id}"] = 0
          end
        end
      end
    end
  end

  def sample; end
end
