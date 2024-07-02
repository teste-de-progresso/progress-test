ActiveAdmin.register Subject do
  permit_params :name,  :axis_id

  remove_filter :questions
end
