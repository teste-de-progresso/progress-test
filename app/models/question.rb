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
class Question < ApplicationRecord
  include Trashable
  extend Enumerize

  belongs_to :user
  belongs_to :subject, optional: true
  has_many :review_requests, dependent: :destroy
  has_many :review_messages, dependent: :destroy

  enumerize :status, in: %i[draft waiting_review with_requested_changes approved registered]
  enumerize :difficulty, in: %i[easy medium hard]
  enumerize :bloom_taxonomy, in: %i[remember understand apply analyze evaluate create]
  enumerize :check_type, in: %i[
    unique_answer
    incomplete_affirmation
    multiple_answer
    negative_focus
    assertion_and_reason
    gap
    interpretation
    association
    ordering_or_ranking
    constant_alternatives
  ]

  def reviewer
    review_requests.last&.user
  end
end
