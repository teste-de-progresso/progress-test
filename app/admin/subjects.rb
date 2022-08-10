ActiveAdmin.register Subject do
  permit_params :name, :category_id, :axis_id

  remove_filter :questions
end
