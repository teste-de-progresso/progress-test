class AssessmentPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end

    def index?
      @roles.find do |role|
        admin nde coordinator center_director pro_rector teacher
      end
    end
  end
end
