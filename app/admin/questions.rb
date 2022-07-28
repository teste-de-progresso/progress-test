ActiveAdmin.register Question do
  permit_params :authorship, :authorship_year, :check_type, :difficulty, :status, :subject_id

  index do
    selectable_column
    id_column
    column :user
    column :subject
    column :bloom_taxonomy
    column :check_type
    column :difficulty
    column :status
    column :created_at
    column :updated_at
    actions
  end

  form do |f|
    f.inputs do
      f.input :authorship
      f.input :authorship_year
      f.input :check_type
      f.input :difficulty
      f.input :status
      f.input :subject
    end
    f.actions
  end
end
