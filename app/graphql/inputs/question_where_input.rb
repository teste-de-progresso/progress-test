# frozen_string_literal: true

module Inputs
  class QuestionWhereInput < Types::BaseInputObject
    argument :check_type, [Enums::QuestionCheckTypeEnum], required: false
    argument :status, [Enums::QuestionStatusEnum], required: false
    argument :difficulty, [Enums::QuestionDifficultyEnum], required: false
    argument :bloom_taxonomy, [Enums::QuestionBloomTaxonomyEnum], required: false
    argument :authorship_year, [String], required: false
    argument :subject_id, ID, required: false
    argument :user_id, ID, required: false
    argument :create_date, DateRangeInput, required: false
    argument :unifeso_authorship, Boolean, required: false
  end
end
