class CostCategoryPresenter
  def self.month_limits(limit = nil)
    CostCategory.joins(:costs)
      .where(costs: { spent_on: Date.current.beginning_of_month..Date.current.end_of_month })
      .select('SUM(costs.amount) AS month_amount', :name, :month_limit)
      .group('cost_categories.name, cost_categories.month_limit')
      .order('month_amount DESC')
      .limit(limit)
      .map do |s|
        {
          name: s.name,
          month_amount: s.month_amount,
          month_limit: s.month_limit,
          progress: progress(s.month_amount, s.month_limit)
        }
      end.sort_by { |i| i[:progress] }.reverse
  end

  def self.progress(amount, limit)
    case
    when amount && limit
      (amount.to_f / limit * 100).round
    end
  end
end
