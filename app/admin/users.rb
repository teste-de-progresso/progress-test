ActiveAdmin.register User do
  permit_params :email, :name, role_ids: []

  index do
    selectable_column
    id_column
    column :email
    column :name
    column :created_at
    actions
  end

  filter :email
  filter :name
  filter :created_at

  form do |f|
    f.inputs do
      f.input :email
      f.input :name
      f.input :roles, as: :check_boxes
    end
    f.actions
  end
end
