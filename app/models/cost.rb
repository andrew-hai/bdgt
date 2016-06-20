class Cost < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :name, :amount
end
