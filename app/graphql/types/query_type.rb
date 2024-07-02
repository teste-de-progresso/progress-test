module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :questions, QuestionType.connection_type, null: false do
      argument :where, Inputs::QuestionWhereInput, required: false
    end
    field :axes, AxisType.connection_type, null: false
    field :subjects, SubjectType.connection_type, null: false
    field :reviewers, UserType.connection_type, null: false
    field :question_filter_options, QuestionFilterOptionsType, null: false
    field :current_user, Types::UserType, null: true

    def questions(where: nil)
      Resolvers::QuestionsQueryResolver.new(Question, context: context, where: where).resolve
    end

    def axes
      Resolvers::AxesQueryResolver.new(context).resolve
    end

    def subjects
      Resolvers::SubjectsQueryResolver.new(context).resolve
    end

    def reviewers
      Resolvers::ReviewersQueryResolver.new(context).resolve
    end


    def question_filter_options
      Resolvers::QuestionFilterOptionsQueryResolver.new.resolve
    end

    def current_user
      context[:current_user]
    end
  end
end
