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
FactoryBot.define do
  factory :question do
    introduction { "question title" }
    instruction { "html raw" }
    support { "html raw" }
    body { "html raw" }
    alternatives do
      [{ text: "html raw", correct: true },
       { text: "html raw", correct: false },
       { text: "html raw", correct: false },
       { text: "html raw", correct: false },
       { text: "html raw", correct: false }]
    end
    explanation { "html raw" }
    references { "html raw" }
    status { "registered" }
    difficulty { "easy" }
    check_type { "unique_answer" }
    bloom_taxonomy { "understand" }
    authorship_year { "2020" }
    authorship { "UNIFESO" }
    user
    subject
  end
end
