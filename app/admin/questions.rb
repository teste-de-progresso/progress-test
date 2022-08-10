ActiveAdmin.register Question do
  permit_params :authorship, :authorship_year, :check_type, :difficulty, :status, :subject_id

  scope :all, default: true
  scope :trashed

  filter :user
  filter :subject
  filter :authorship
  filter :authorship_year
  filter :created_at
  filter :updated_at
  filter :deleted_at
  filter :status, as: :check_boxes, collection: proc { Question.status.options }
  filter :difficulty, as: :check_boxes, collection: proc { Question.difficulty.options }
  filter :bloom_taxonomy, as: :check_boxes, collection: proc { Question.bloom_taxonomy.options }
  filter :check_type, as: :check_boxes, collection: proc { Question.check_type.options }

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
    column :bloom_taxonomy do |question|
      question.bloom_taxonomy_text
    end
    column :check_type do |question|
      question.check_type_text
    end
    column :difficulty do |question|
      question.difficulty_text
    end
    column :status do |question|
      question.status_text
    end
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
