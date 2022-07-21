# frozen_string_literal: true

module Enums
  class QuestionBloomTaxonomyEnum < Types::BaseEnum
    graphql_name "QuestionBloomTaxonomy"

    values_from_enumerize(Question.bloom_taxonomy)
  end
end
