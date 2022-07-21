# frozen_string_literal: true
module Resolvers
  class QuestionsQueryResolver
    def initialize(initial_scope, context:, where:)
      @initial_scope = initial_scope
      @context = context
      @where = where.to_h
    end

    def resolve
      set_created_at_filter

      unifeso_authorship = @where.delete(:unifeso_authorship)

      scope = QuestionPolicy::Scope.new(@context[:current_user], @initial_scope).resolve
        .where(@where)
        .order(updated_at: :desc)

      return scope if unifeso_authorship.nil?

      unifeso_authorship ? scope.where(authorship: "UNIFESO") : scope.where.not(authorship: "UNIFESO")
    end

    private

    def set_created_at_filter
      create_date_range = @where.delete(:create_date)

      @where[:created_at] = create_date_range[:start_at]..create_date_range[:end_at] if create_date_range
    end
  end
end
