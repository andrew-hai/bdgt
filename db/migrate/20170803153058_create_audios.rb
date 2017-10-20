class CreateAudios < ActiveRecord::Migration[5.1]
  def change
    create_table :audios do |t|
      t.string :artist
      t.string :title
      t.string :album
      t.integer :year
      t.string :track_number
      t.string :genre
      t.string :content
      t.string :content2
      t.string :language
      t.attachment :file

      t.timestamps null: false
    end
  end
end
