class QuestionPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
  end


  def create?
    user.roles.present?
  end

  def update?
    is?(:admin) || is?(:nde) || (is?(:teacher) && record.user_id == user.id)
  end

  def destroy?
    record.user_id == user.id && record.status != "registered"
  end

  def finish?
    (is?(:admin) || record.user_id == user.id) && record.status.to_sym == :approved
  end
end
