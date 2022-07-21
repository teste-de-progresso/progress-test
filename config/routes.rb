Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }

  root to: "entrypoint#index"
  get "*all" => "entrypoint#index", constraints: lambda { |req|
    ["playground", "rails", "graphql"].filter do |path|
      req.path.include?(path)
    end.blank?
  }

  post "/graphql", to: "graphql#execute"

  ActiveAdmin.routes(self)

  if Rails.env.development?
    mount GraphqlPlayground::Rails::Engine, at: "/playground", graphql_path: "/graphql"
  end
end
