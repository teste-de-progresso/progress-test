# frozen_string_literal: true

module Mutations
  class CreateQuestion < BaseMutation
    field :question, Types::QuestionType, null: true

    argument :question, Inputs::QuestionCreateInput, required: true

    def resolve(question:)
      question = question.to_h
      reviewer_user_id = question.delete(:reviewer_user_id)

      record = Question.new(question)
      record.user_id = context[:current_user].id

      policy = QuestionPolicy.new(context[:current_user], record)

      raise Pundit::NotAuthorizedError unless policy.create?

      ActiveRecord::Base.transaction do
        record.save!

        if reviewer_user_id.present? && question[:status] != "draft"
          record.review_requests.create!(user_id: reviewer_user_id)
        end

        { question: record, errors: [] }
      rescue ActiveRecord::RecordInvalid
        { question: nil, errors: record.errors.full_messages }
      end
    rescue Pundit::NotAuthorizedError => e
      { question: nil, errors: [e.message] }
    end
  end
end
