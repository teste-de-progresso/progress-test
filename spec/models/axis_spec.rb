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
require 'rails_helper'

RSpec.describe(Axis, type: :model) do
  describe "associations" do
    it { is_expected.to(have_many(:subjects)) }
  end

  describe "validations" do
    subject { create :axis }

    it { is_expected.to(validate_presence_of(:name)) }
    it { is_expected.to(validate_uniqueness_of(:name)) }
  end
end
