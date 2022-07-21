# frozen_string_literal: true

module Types
  class ReviewRequestType < Types::BaseObject
    graphql_name "ReviewRequest"

    field :id, ID, null: false
    field :answered, Boolean, null: false

    field :question, Types::QuestionType, null: false
    def question
      dataloader.with(Sources::ActiveRecord, Question).load(object.question_id)
    end

    field :user, Types::UserType, null: false
    def user
      dataloader.with(Sources::ActiveRecord, User).load(object.user_id)
    end
  end
end
