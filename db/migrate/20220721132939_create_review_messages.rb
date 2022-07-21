class CreateReviewMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :review_messages do |t|
      t.string :feedback_type
      t.string :content
      t.references :question, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
