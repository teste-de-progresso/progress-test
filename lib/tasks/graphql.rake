namespace :graphql do
  desc "Dump graphql schema to app/graphql/__generated__/schema.graphql"
  task dump: :environment do
    File.write(
      Rails.root.join(ProgressTestSchema::DEFINITION_DUMP_PATH),
      ProgressTestSchema.to_definition
    )

    puts("#{ProgressTestSchema::DEFINITION_DUMP_PATH} updated")
  end
end
