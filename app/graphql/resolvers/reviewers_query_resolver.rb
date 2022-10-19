# frozen_string_literal: true
module Resolvers
  class ReviewersQueryResolver
    def initialize(context)
      @context = context
    end

    def resolve
      scope = UserPolicy::Scope.new(@context[:current_user], User).resolve
        .where.not(id: @context[:current_user].id)
        .distinct

      scope.filter { |u| u.roles.any?('teacher') || u.roles.any?('nde') }
    end
  end
end
