class CostQuery < BaseQuery
  @base_scope = Cost.includes(:user).order('id DESC')
  @filters = {}

  filter :amount
  filter :cost_category_id
  filter :name, type: :like
end
