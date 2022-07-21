class CreateAxes < ActiveRecord::Migration[7.0]
  def change
    create_table :axes do |t|
      t.string :name

      t.timestamps
    end

    add_index(:axes, :name, unique: true)
  end
end
