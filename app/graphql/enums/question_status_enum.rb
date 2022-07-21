# frozen_string_literal: true

module Enums
  class QuestionStatusEnum < Types::BaseEnum
    graphql_name "QuestionStatus"

    values_from_enumerize(Question.status)
  end
end
