# frozen_string_literal: true
module Types
  class ReviewMessageType < Types::BaseObject
    graphql_name "ReviewMessage"

    field :id, ID, null: false
    field :user, UserType, null: false
    field :question, QuestionType, null: false
    field :text, String, null: false
    field :feedback_type, Enums::ReviewMessageFeedbackTypeEnum, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
