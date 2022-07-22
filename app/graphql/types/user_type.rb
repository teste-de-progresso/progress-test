# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    graphql_name "User"

    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :roles, [Enums::RoleEnum], null: false
    field :avatar_url, String, null: true

    def roles
      object.roles.map(&:name)
    end
  end
end
