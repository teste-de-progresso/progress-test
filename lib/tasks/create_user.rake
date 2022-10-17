namespace :user do
  task :create_admin, [:email, :name] do  |_, args|
    user = User.create!(
      email: args[:email],
      name: args[:name],
      roles: [:admin]
    )
  end
end

