class CreateFunds < ActiveRecord::Migration
  def change
    create_table :funds do |t|
      t.string :name
      t.string :currency
      t.text :description

      t.timestamps null: false
    end
  end
end
