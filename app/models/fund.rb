class Fund < ActiveRecord::Base
  CURRENCIES = ['EUR', 'RUR', 'UAH', 'USD'].freeze

  validates_presence_of :name, :currency
end
