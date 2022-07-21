# frozen_string_literal: true

module Enums
  class RoleEnum < Types::BaseEnum
    graphql_name "UserRole"

    values(%w[admin teacher nde coordinator center_director pro_rector])
  end
end
