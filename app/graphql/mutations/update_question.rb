# frozen_string_literal: true

module Mutations
  class UpdateQuestion < BaseMutation
    field :question, Types::QuestionType, null: true

    argument :question, Inputs::QuestionUpdateInput, required: true

    def resolve(question:)
      question = question.to_h
      reviewer_user_id = question.delete(:reviewer_user_id)

      record = Question.find(question[:id])

      raise Pundit::NotAuthorizedError unless QuestionPolicy.new(context[:current_user], record).update?

      ActiveRecord::Base.transaction do
        record.update!(question)

        if reviewer_user_id.present? && question[:status] != "draft"
          review_request = record.review_requests.find_or_create_by!(
            user_id: reviewer_user_id
          )

          review_request.update!(answered: false)
        end

        { question: record, errors: [] }
      rescue ActiveRecord::RecordInvalid
        { question: nil, errors: question.errors.full_messages }
      end

    rescue Pundit::NotAuthorizedError => e
      { question: nil, errors: [e.message] }
    end
  end
end
