module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :questions, QuestionType.connection_type, null: false do
      argument :where, Inputs::QuestionWhereInput, required: false
    end

    field :current_user, Types::UserType, null: true

    def questions(where: nil)
      Resolvers::QuestionsQueryResolver.new(Question, context: context, where: where).resolve
    end

    def current_user
      context[:current_user]
    end
  end
end
