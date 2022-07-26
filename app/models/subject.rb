# == Schema Information
#
# Table name: subjects
#
#  id          :bigint           not null, primary key
#  name        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  axis_id     :bigint           not null
#  category_id :bigint           not null
#
# Indexes
#
#  index_subjects_on_axis_id      (axis_id)
#  index_subjects_on_category_id  (category_id)
#  index_subjects_on_name         (name) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (axis_id => axes.id)
#  fk_rails_...  (category_id => categories.id)
#
class Subject < ApplicationRecord
  belongs_to :category
  belongs_to :axis

  has_many :questions

  validates :name, presence: true, uniqueness: true
end
