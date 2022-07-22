# frozen_string_literal: true

module Types
  class QuestionType < Types::BaseObject
    implements GraphQL::Types::Relay::Node

    graphql_name 'Question'

    global_id_field :id
    field :authorship, String
    field :authorship_year, String
    field :body, String
    field :explanation, String
    field :instruction, String
    field :intention, String
    field :references, String
    field :support, String
    field :user, Types::UserType, null: false
    field :subject, Types::SubjectType
    field :reviewer, Types::UserType
    field :review_messages, Types::ReviewMessageType.connection_type, null: false
    field :alternatives, [Types::QuestionAlternativeType], null: false
    field :bloom_taxonomy, Enums::QuestionBloomTaxonomyEnum
    field :check_type, Enums::QuestionCheckTypeEnum
    field :difficulty, Enums::QuestionDifficultyEnum
    field :status, Enums::QuestionStatusEnum, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def self.model
      Question
    end
  end
end
