# frozen_string_literal: true

module Mutations
  class UpdateQuestion < BaseMutation
    field :question, Types::QuestionType, null: true

    argument :question, Inputs::QuestionUpdateInput, required: true

    def resolve(question:)
      question_attributes = question.to_h
      reviewer_user_id = question_attributes.delete(:reviewer_user_id)

      question = Question.find(question_attributes[:id])

      raise Pundit::NotAuthorizedError unless QuestionPolicy.new(context[:current_user], question).update?

      ActiveRecord::Base.transaction do
        question.update!(question_attributes)

        if reviewer_user_id.present? && question_attributes[:status] != "draft"
          review_request = question.review_requests.find_or_create_by!(
            user_id: reviewer_user_id
          )

          review_request.update!(answered: false)
        end

        { question: question, errors: [] }
      rescue ActiveRecord::RecordInvalid
        { question: nil, errors: question.errors.full_messages }
      end
    rescue Pundit::NotAuthorizedError => e
      { question: nil, errors: [e.message] }
    end
  end
end
