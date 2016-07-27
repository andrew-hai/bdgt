class AddFromToAndMonthLimit < ActiveRecord::Migration
  def change
    add_column :cost_categories, :month_limit, :integer, default: 2000

    add_column :fund_changes, :from, :integer
    add_column :fund_changes, :to, :integer
  end
end
