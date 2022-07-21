# frozen_string_literal: true

require "rails_helper"

describe ProgressTestSchema do
  context "schema dump" do
    it "is updated" do
      File.open(described_class::DEFINITION_DUMP_PATH, "r") do |f|
        expect(f.read).to(eq(described_class.to_definition))
      end
    end
  end
end
