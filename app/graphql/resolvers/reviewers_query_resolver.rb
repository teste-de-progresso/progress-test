# frozen_string_literal: true
module Resolvers
  class ReviewersQueryResolver
    def initialize(context)
      @context = context
    end

    def resolve
      UserPolicy::Scope.new(@context[:current_user], User)
        .resolve
        .where(roles: %i[teacher nde])
        .where.not(id: @context[:current_user].id)
        .distinct
    end
  end
end
