class CreateSecureMarks < ActiveRecord::Migration[5.1]
  def change
    create_table :secure_marks do |t|
      t.string :seasonvar_value
    end
  end
end
