# frozen_string_literal: true
module Resolvers
  class CategoriesQueryResolver
    def initialize(context)
      @context = context
    end

    def resolve
      CategoryPolicy::Scope.new(@context[:current_user], Category).resolve
    end
  end
end
