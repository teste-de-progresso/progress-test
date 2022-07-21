# frozen_string_literal: true

module Inputs
  class DateRangeInput < Types::BaseInputObject
    argument :start_at, GraphQL::Types::ISO8601Date, required: true
    argument :end_at, GraphQL::Types::ISO8601Date, required: true
  end
end
