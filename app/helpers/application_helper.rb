module ApplicationHelper
  def cost_categories
    @cost_categories ||= CostCategory.all.order(:name)
  end

  def currency_grouped_funds
    @currency_grouped_funds ||= Fund.group(:currency).sum(:amount)
  end
end
