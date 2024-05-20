source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.3.0"

gem "rails", "~> 7.0.3", ">= 7.0.3.1"

gem "sprockets-rails"

gem 'nio4r', '~> 2.5.8'

gem "puma", "~> 5.0"

gem "jsbundling-rails"

gem "turbo-rails"

gem "stimulus-rails"

gem "jbuilder"

gem "redis", "~> 4.0"

gem "bootsnap", require: false

gem "rails-i18n", "~> 7.0"

gem "image_processing", "~> 1.2"

gem "pundit", "~> 2.2"
gem "enumerize", "~> 2.5"

gem "activeadmin", "~> 2.13"
gem "sassc-rails"

gem "devise", "~> 4.8"
gem "omniauth", "~> 1.9.1"
gem "omniauth-google-oauth2", "~> 0.8.2"

gem "graphql", "~> 2.0"
gem "rack-cors", "~> 1.1"

group :development, :test do
  gem "pg", "~> 1.1"
  gem "dotenv-rails", "~> 2.7"
  gem "rspec-rails", "~> 5.1"
  gem "factory_bot_rails", "~> 6.2"
  gem "faker", "~> 2.21"

  gem "debug", platforms: %i[ mri mingw x64_mingw ]
end

group :production do
  gem 'activerecord-nulldb-adapter'
end

group :development do
  gem "annotate", "~> 3.2"
  gem "rails-erd", "~> 1.7"
  gem "web-console"
  gem "graphql_playground-rails"
end

group :test do
  gem "shoulda-matchers", "~> 5.1"
end