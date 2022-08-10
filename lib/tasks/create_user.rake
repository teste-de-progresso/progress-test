namespace :user do
  task :create_admin, [:email, :name] do  |_, args|
    User.create!(
      email: args[:email],
      name: args[:name]
    )
  end
end

