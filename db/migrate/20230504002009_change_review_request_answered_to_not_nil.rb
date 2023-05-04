class ChangeReviewRequestAnsweredToNotNil < ActiveRecord::Migration[7.0]
  def change
    ReviewRequest.where(answered: nil).update_all(answered: false)

    change_column_null :review_requests, :answered, false
  end
end
