module Types
  class BaseEnum < GraphQL::Schema::Enum
    def self.values_from_enumerize(enum_values)
      enum_values.values.each do |enum_value|
        value enum_value.upcase, value: enum_value
      end
    end
  end
end
