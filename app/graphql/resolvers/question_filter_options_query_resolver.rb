# frozen_string_literal: true
module Resolvers
    class QuestionFilterOptionsQueryResolver
      def initialize; end

      def resolve
        {
          years: Question.distinct(:authorship_year).pluck(:authorship_year)
        }
      end
    end
  end
