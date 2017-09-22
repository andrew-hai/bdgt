class CreateAudios < ActiveRecord::Migration[5.1]
  def change
    create_table :audios do |t|
      t.string :name
      t.string :author
      t.attachment :file

      t.timestamps null: false
    end
  end
end
