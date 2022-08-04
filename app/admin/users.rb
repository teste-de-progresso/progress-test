ActiveAdmin.register User do
  permit_params :email, :name, roles: []

  scope :all, default: true
  scope :trashed

  controller do
    def show
      @user = User.unscoped.find_by!(permitted_params[:user])
    end

    def edit
      @user = User.unscoped.find_by!(permitted_params[:user])
    end

    def destroy
      @user = User.unscoped.find(permitted_params[:id])

      if @user.deleted_at
        redirect_to admin_users_path, notice: t('active_admin.user.already_destroyed')
      else
        @user.destroy
        redirect_to admin_users_path, notice: t('active_admin.user.succesfully_destroyed')
      end
    end
  end

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
