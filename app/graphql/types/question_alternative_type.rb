# frozen_string_literal: true

module Types
  class QuestionAlternativeType < Types::BaseObject
    graphql_name "QuestionAlternative"

    field :correct, Boolean, null: false
    field :text, String, null: true
  end
end
