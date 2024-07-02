# == Schema Information
#
# Table name: subjects
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  axis_id    :bigint           not null
#
# Indexes
#
#  index_subjects_on_axis_id  (axis_id)
#  index_subjects_on_name     (name) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (axis_id => axes.id)
#
FactoryBot.define do
  factory :subject do
    name { Faker::Superhero.name }
    axis
  end
end
