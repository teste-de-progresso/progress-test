# == Schema Information
#
# Table name: axes
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_axes_on_name  (name) UNIQUE
#
FactoryBot.define do
  factory :axis do
    name { Faker::Superhero.name }
  end
end
