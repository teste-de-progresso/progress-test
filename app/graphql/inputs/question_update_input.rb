# frozen_string_literal: true

module Inputs
  class QuestionUpdateInput < QuestionCreateInput
    argument :id, ID, required: true
  end
end
