class CreateReviewRequests < ActiveRecord::Migration[7.0]
  def change
    create_table :review_requests do |t|
      t.string :answered
      t.references :question, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
