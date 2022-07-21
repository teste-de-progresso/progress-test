module Types
  class MutationType < Types::BaseObject
    field :create_question, mutation: Mutations::CreateQuestion
    field :update_question, mutation: Mutations::UpdateQuestion
    field :destroy_question, mutation: Mutations::DestroyQuestion
    field :finish_question, mutation: Mutations::FinishQuestion
    field :create_review_message, mutation: Mutations::CreateReviewMessage
  end
end
