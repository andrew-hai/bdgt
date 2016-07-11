class FundChange < ActiveRecord::Base
  CURRENCIES = ['EUR', 'RUR', 'UAH', 'USD'].freeze

  enum fc_type: [:incoming, :outgoing]

  belongs_to :fund

  validates_presence_of :amount, :fc_type, :fund
end
