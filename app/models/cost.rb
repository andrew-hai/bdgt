class Cost < ApplicationRecord
  belongs_to :user
  belongs_to :cost_category

  validates_presence_of :name, :cost_category_id, :amount
end
