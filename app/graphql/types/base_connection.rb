module Types
  class BaseConnection < Types::BaseObject
    include GraphQL::Types::Relay::ConnectionBehaviors

    edges_nullable(false)
    edge_nullable(false)
    node_nullable(false)

    field :total_count, Integer, null: false

    def total_count
      object.items.count
    end
  end
end
