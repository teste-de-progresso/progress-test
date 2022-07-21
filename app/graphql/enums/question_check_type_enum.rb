# frozen_string_literal: true

module Enums
  class QuestionCheckTypeEnum < Types::BaseEnum
    graphql_name "QuestionCheckType"

    values_from_enumerize(Question.check_type)
  end
end
