# frozen_string_literal: true

module Mutations
  class CreateQuestion < BaseMutation
    field :question, Types::QuestionType, null: true

    argument :question, Inputs::QuestionCreateInput, required: true

    def resolve(question:)
      question_attributes = question.to_h
      reviewer_user_id = question_attributes.delete(:reviewer_user_id)

      question = Question.new(question_attributes)
      question.user_id = context[:current_user].id

      policy = QuestionPolicy.new(context[:current_user], question)

      raise Pundit::NotAuthorizedError unless policy.create?

      ActiveRecord::Base.transaction do
        question.save!

        if reviewer_user_id.present? && question_attributes[:status] != "draft"
          question.review_requests.create!(user_id: reviewer_user_id)
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
