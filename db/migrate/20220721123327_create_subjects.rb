class CreateSubjects < ActiveRecord::Migration[7.0]
  def change
    create_table :subjects do |t|
      t.string :name
      t.references :axis, null: false, foreign_key: true

      t.timestamps
    end

    add_index(:subjects, :name, unique: true)
  end
end
