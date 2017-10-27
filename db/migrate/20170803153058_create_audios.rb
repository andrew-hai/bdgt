class CreateAudios < ActiveRecord::Migration[5.1]
  def change
    create_table :audios do |t|
      t.string :artist
      t.string :title
      t.string :album
      t.integer :year
      t.integer :track_number
      t.string :genre
      t.integer :duration
      t.attachment :file

      t.timestamps null: false
    end
  end
end
