class AddAdminToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :admin, :boolean, default: true, null: false
  end
end
