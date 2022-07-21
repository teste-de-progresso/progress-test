# frozen_string_literal: true

module Types
  class QuestionType < Types::BaseObject
    implements GraphQL::Types::Relay::Node

    graphql_name 'Question'

    global_id_field :id
    field :user_id, Integer, null: false
    field :subject_id, Integer
    field :alternatives, GraphQL::Types::JSON, null: false
    field :authorship, String
    field :authorship_year, String
    field :body, String
    field :explanation, String
    field :instruction, String
    field :intention, String
    field :references, String
    field :support, String
    field :bloom_taxonomy, Enums::QuestionBloomTaxonomyEnum
    field :check_type, Enums::QuestionCheckTypeEnum
    field :difficulty, Enums::QuestionDifficultyEnum
    field :status, Enums::QuestionStatusEnum, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
