class CostQuery < BaseQuery
  base_scope Cost.includes(:user).order('id DESC')

  filter :amount_from, query_type: :'>='
  filter :amount_to, query_type: :'<='
  filter :cost_category_id
  filter :name, query_type: :full_like
  filter :spent_on_from, query_type: :'>='
  filter :spent_on_to, query_type: :'<='
end
