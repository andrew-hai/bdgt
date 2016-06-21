class CostCategory < ActiveRecord::Base
  has_many :costs, inverse_of: :cost_category

  validates_presence_of :name
end
