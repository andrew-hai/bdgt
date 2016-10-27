class Income < ApplicationRecord
  belongs_to :user

  validates_presence_of :name, :amount
end
