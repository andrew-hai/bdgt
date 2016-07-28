class Fund < ApplicationRecord
  CURRENCIES = ['EUR', 'RUR', 'UAH', 'USD'].freeze

  after_save :create_fund_change

  has_many :fund_changes, inverse_of: :fund, dependent: :destroy

  validates_presence_of :name, :currency

  private def create_fund_change
    if changes.key?(:amount)
      fund_changes.create(
        amount: (changes[:amount][1] - changes[:amount][0].to_i).abs,
        from: changes[:amount][0],
        to: changes[:amount][1],
        fc_type: (changes[:amount][1] - changes[:amount][0].to_i) > 0 ? :incoming : :outgoing
      )
    end
  end
end
