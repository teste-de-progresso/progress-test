class ProgressTestSchema < GraphQL::Schema
  DEFINITION_DUMP_PATH = "app/javascript/__generated__/schema.graphql"

  mutation(Types::MutationType)
  query(Types::QueryType)

  # For batch-loading (see https://graphql-ruby.org/dataloader/overview.html)
  use GraphQL::Dataloader

  # GraphQL-Ruby calls this when something goes wrong while running a query:
  def self.type_error(err, context)
    # if err.is_a?(GraphQL::InvalidNullError)
    #   # report to your bug tracker here
    #   return nil
    # end
    super
  end

  # Union and Interface Resolution
  def self.resolve_type(abstract_type, obj, ctx)
    case obj
    when Question
      Types::QuestionType
    else
      raise("Unexpected object: #{obj}")
    end
  end

  # Relay-style Object Identification:

  # Return a string UUID for `object`
  def self.id_from_object(object, type_definition, query_ctx)
    # object.to_gid_param
    GraphQL::Schema::UniqueWithinType.encode(type_definition.name, object.id)
  end

  # Given a string UUID, find the object
  def self.object_from_id(global_id, query_ctx)
    # GlobalID.find(global_id)
    type_name, item_id = GraphQL::Schema::UniqueWithinType.decode(global_id)
    type_name.constantize.model.find(item_id)
  end
end
