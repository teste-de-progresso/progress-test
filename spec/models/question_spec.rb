# == Schema Information
#
# Table name: questions
#
#  id              :bigint           not null, primary key
#  alternatives    :jsonb            not null
#  authorship      :string
#  authorship_year :string
#  bloom_taxonomy  :string
#  body            :text
#  check_type      :string
#  deleted_at      :datetime
#  difficulty      :string
#  explanation     :text
#  instruction     :text
#  intention       :text
#  references      :text
#  status          :string           default("draft"), not null
#  support         :text
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  subject_id      :bigint
#  user_id         :bigint           not null
#
# Indexes
#
#  index_questions_on_subject_id  (subject_id)
#  index_questions_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (subject_id => subjects.id)
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe Question, type: :model do
  describe "associations" do
    it { is_expected.to(belong_to(:user)) }
    it { is_expected.to(belong_to(:subject).optional(true)) }
    # it { is_expected.to(have_many(:review_requests)) }
    # it { is_expected.to(have_many(:review_messages)) }
  end
end
