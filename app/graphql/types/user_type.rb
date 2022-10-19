# frozen_string_literal: true

module Types
  class UserType < Types::BaseObject
    graphql_name "User"

    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :roles, [Enums::RoleEnum], null: false
    field :avatar_url, String, null: true

    field :inactive_review_requests, Types::ReviewRequestType.connection_type, null: false
    field :active_review_requests, Types::ReviewRequestType.connection_type, null: false

    def inactive_review_requests
      object.review_requests.inactive
    end

    def active_review_requests
      object.review_requests.active
    end
  end
end
