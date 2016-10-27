class CreateIncomes < ActiveRecord::Migration[5.0]
  def change
    create_table :incomes do |t|
      t.string :name
      t.integer :amount
      t.text :description
      t.date :got_on
      t.references :user, index: true

      t.timestamps null: false
    end
  end
end
