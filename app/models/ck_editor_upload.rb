# == Schema Information
#
# Table name: ck_editor_uploads
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class CkEditorUpload < ApplicationRecord
  has_one_attached :attachment
end
