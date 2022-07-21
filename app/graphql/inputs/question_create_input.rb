# frozen_string_literal: true

module Inputs
  class QuestionCreateInput < Types::BaseInputObject
    argument :instruction, String, required: true
    argument :support, String, required: true
    argument :body, String, required: true
    argument :alternatives, [QuestionAlternativeInput], required: true
    argument :explanation, String, required: true
    argument :references, String, required: true
    argument :authorship_year, String, required: true
    argument :authorship, String, required: true
    argument :intention, String, required: false
    argument :status, Enums::QuestionStatusEnum, required: true
    argument :check_type, Enums::QuestionCheckTypeEnum, required: false
    argument :difficulty, Enums::QuestionDifficultyEnum, required: false
    argument :bloom_taxonomy, Enums::QuestionBloomTaxonomyEnum, required: false
    argument :subject_id, ID, required: false
    argument :reviewer_user_id, ID, required: false
  end
end
