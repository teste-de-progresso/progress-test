# frozen_string_literal: true

module Mutations
  class DestroyQuestion < BaseMutation
    field :deleted_question_id, ID, null: true

    argument :question_id, ID, required: true

    def resolve(question_id:)
      question = Question.find_by(id: question_id)
      reviewer = question.reviewer

      raise Pundit::NotAuthorizedError unless QuestionPolicy.new(context[:current_user], question).destroy?

      return { errors: question.errors.full_messages } unless question.destroy!

      ReviewerMailer.with(question_id: question_id, recipient: reviewer)
        .question_deleted_notification
        .deliver if reviewer

      { deleted_question_id: question_id, errors: [] }
    rescue Pundit::NotAuthorizedError => e
      { errors: [e.message] }
    end
  end
end
