# frozen_string_literal: true

module Mutations
  class CreateReviewMessage < BaseMutation
    field :review_message, Types::ReviewMessageType, null: true

    argument :message, Inputs::ReviewMessageInput, required: true

    def resolve(message:)
      message = message.to_h

      ActiveRecord::Base.transaction do
        record = ReviewMessage.create!({
          **message,
          user_id: current_user.id,
        })

        update_question_status(record.question, message[:feedback_type])
        update_review_requests(record.question, message[:feedback_type])

        { review_message: record, errors: [] }
      rescue ActiveRecord::RecordInvalid => e
        { review_message: nil, errors: e.record.errors.full_messages }
      end
    rescue Pundit::NotAuthorizedError => e
      { review_message: nil, errors: [e.message] }
    end

    private

    def update_question_status(question, feedback_type)
      new_question_status = case feedback_type
      when "request_changes"
        "with_requested_changes"
      when "approve"
        "approved"
      when "answer"
        "waiting_review"
      end

      question.update!(status: new_question_status)
    end

    def update_review_requests(question, feedback_type)
      return question.review_requests.update_all(answered: false) if feedback_type == "answer"

      question
        .review_requests
        .where(user_id: current_user.id)
        .update_all(answered: question.user_id != current_user.id)
    end
  end
end
