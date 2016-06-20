class CreateCosts < ActiveRecord::Migration
  def change
    create_table :costs do |t|
      t.string :name
      t.integer :amount
      t.text :description
      t.date :spent_on
      t.references :user, index: true
      t.references :cost_category, index: true

      t.timestamps null: false
    end
  end
end
