# frozen_string_literal: true

module Inputs
  class ReviewMessageInput < Types::BaseInputObject
    argument :feedback_type, Enums::ReviewMessageFeedbackTypeEnum, required: true
    argument :text, String, required: true
    argument :question_id, ID, required: true
  end
end
