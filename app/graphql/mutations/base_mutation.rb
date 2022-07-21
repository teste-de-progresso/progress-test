module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject

    field :errors, [String],
      null: false,
      description: "Errors encountered during execution of the mutation."

    def current_user
      context[:current_user]
    end
  end
end
