class CostCategoryPresenter
  def self.month_limits(limit = nil)
    CostCategory.joins(:costs)
      .where(costs: { spent_on: (Date.current - 30.days)..Date.current })
      .select('SUM(costs.amount) AS month_amount', :name, :month_limit)
      .group('cost_categories.name, cost_categories.month_limit')
      .order('month_amount DESC')
      .limit(limit)
      .map do |s|
        {
          name: s.name,
          month_amount: s.month_amount,
          month_limit: s.month_limit,
          progress: progress(s.month_limit, s.month_amount)
        }
      end
  end

  def self.progress(limit, amount)
    case
    when amount && limit
      (limit.to_f / amount * 100).round
    end 
  end
end
