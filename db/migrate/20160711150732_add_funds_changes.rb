class AddFundsChanges < ActiveRecord::Migration
  def change
    create_table :fund_changes do |t|
      t.integer :amount
      t.integer :fc_type
      t.references :fund, index: true

      t.timestamps null: false
    end

    add_column :funds, :amount, :integer
  end
end
