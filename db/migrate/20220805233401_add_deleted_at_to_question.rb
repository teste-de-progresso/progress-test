class AddDeletedAtToQuestion < ActiveRecord::Migration[7.0]
  def change
    add_column :questions, :deleted_at, :datetime
  end
end
