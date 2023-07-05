# frozen_string_literal: true
module Resolvers
    class AxesQueryResolver
      def initialize(context)
        @context = context
      end
  
      def resolve
        AxisPolicy::Scope.new(@context[:current_user], Axis).resolve
      end
    end
  end
  