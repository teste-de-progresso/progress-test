class CreateCkEditorUploads < ActiveRecord::Migration[7.0]
  def change
    create_table :ck_editor_uploads do |t|
      t.timestamps
    end
  end
end
