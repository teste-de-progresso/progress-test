# frozen_string_literal: true

module Enums
  class ReviewMessageFeedbackTypeEnum < Types::BaseEnum
    graphql_name "ReviewMessageFeedbackType"

    values_from_enumerize(ReviewMessage.feedback_type)
  end
end
