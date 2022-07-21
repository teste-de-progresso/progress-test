# frozen_string_literal: true

module Enums
  class QuestionDifficultyEnum < Types::BaseEnum
    graphql_name "QuestionDifficulty"

    values_from_enumerize(Question.difficulty)
  end
end
