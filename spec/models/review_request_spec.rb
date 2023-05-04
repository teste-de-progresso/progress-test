# == Schema Information
#
# Table name: review_requests
#
#  id          :bigint           not null, primary key
#  answered    :string           not null
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
require 'rails_helper'

RSpec.describe ReviewRequest, type: :model do
  describe "associations" do
    it { is_expected.to(belong_to(:user)) }
    it { is_expected.to(belong_to(:question)) }
  end
end
