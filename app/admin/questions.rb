ActiveAdmin.register Question do
  permit_params :authorship, :authorship_year, :check_type, :difficulty, :status, :subject_id

  scope :all, default: true
  scope :trashed

  controller do
    def show
      @question = Question.unscoped.find_by!(permitted_params[:question])
    end

    def edit
      @question = Question.unscoped.find_by!(permitted_params[:question])
    end

    def destroy
      @question = Question.unscoped.find(permitted_params[:id])

      if @question.deleted_at
        redirect_to admin_questions_path, notice: t('active_admin.question.already_destroyed')
      else
        @question.destroy
        redirect_to admin_questions_path, notice: t('active_admin.question.succesfully_destroyed')
      end
    end
  end

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
