# frozen_string_literal: true

module Mutations
  class FinishQuestion < BaseMutation
    field :question, Types::QuestionType, null: true

    argument :question_id, ID, required: true

    def resolve(input)
      user = context[:current_user]

      question = ::Question.find(input[:question_id])

      raise Pundit::NotAuthorizedError unless QuestionPolicy.new(user, question).finish?

      if question.update(status: :registered)
        { question: question, errors: [] }
      else
        { question: nil, errors: question.errors.full_messages }
      end

    rescue Pundit::NotAuthorizedError => e
      { question: nil, errors: [e.message] }
    end
  end
end
