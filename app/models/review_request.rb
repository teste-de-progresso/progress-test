# == Schema Information
#
# Table name: review_requests
#
#  id          :bigint           not null, primary key
#  answered    :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  question_id :bigint           not null
#  user_id     :bigint           not null
#
# Indexes
#
#  index_review_requests_on_question_id  (question_id)
#  index_review_requests_on_user_id      (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (question_id => questions.id)
#  fk_rails_...  (user_id => users.id)
#
class ReviewRequest < ApplicationRecord
  belongs_to :question
  belongs_to :user

  # answered should be a boolean, it's a string by mistake
  scope :active, -> { where(answered: nil) }
  scope :inactive, -> { where(answered: true) }
end
