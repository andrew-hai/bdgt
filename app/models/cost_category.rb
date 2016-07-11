class CostCategory < ActiveRecord::Base
  has_many :costs, inverse_of: :cost_category, dependent: :destroy

  validates_presence_of :name
end
