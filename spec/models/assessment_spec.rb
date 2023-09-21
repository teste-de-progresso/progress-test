# == Schema Information
#
# Table name: assessments
#
#  id           :bigint           not null, primary key
#  observations :text
#  params       :jsonb
#  title        :string
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  user_id      :bigint           not null
#
# Indexes
#
#  index_assessments_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe Assessment, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
