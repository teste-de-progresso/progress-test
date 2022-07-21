# frozen_string_literal: true

module Types
  class AxisType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :subjects, [SubjectType], null: false
  end
end
