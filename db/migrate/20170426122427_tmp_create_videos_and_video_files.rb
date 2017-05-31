class TmpCreateVideosAndVideoFiles < ActiveRecord::Migration[5.1]
  def change
    create_table :videos do |t|
      t.string :title, null: false
      t.string :url, null: false
      t.text :description, null: false

      t.integer :last_season, null: false, default: 1
      t.integer :last_episod, null: false, default: 1

      t.timestamps null: false
    end

    create_table :video_files do |t|
      t.string :title, null: false
      t.string :url, null: false
      t.references :video, index: true

      t.integer :season, null: false, default: 1
      t.integer :episod, null: false, default: 1

      t.timestamps null: false
    end
  end
end
