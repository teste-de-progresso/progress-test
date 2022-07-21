# frozen_string_literal: true
module Resolvers
  class SubjectsQueryResolver
    def initialize(context)
      @context = context
    end

    def resolve
      SubjectPolicy::Scope.new(@context[:current_user], Subject).resolve
    end
  end
end
