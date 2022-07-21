# frozen_string_literal: true

module Inputs
  class QuestionAlternativeInput < Types::BaseInputObject
    argument :correct, Boolean, required: false
    argument :text, String, required: false
  end
end
