source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.1.2"

gem "rails", "~> 7.0.3", ">= 7.0.3.1"

gem "sprockets-rails"

gem "pg", "~> 1.1"

gem "puma", "~> 5.0"

gem "importmap-rails"

gem "turbo-rails"

gem "stimulus-rails"

gem "jbuilder"

gem "redis", "~> 4.0"

gem "bootsnap", require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

gem "activeadmin", "~> 2.13"
gem "sassc-rails"

gem "devise", "~> 4.8"
gem "omniauth", "~> 1.9.1"
gem "omniauth-google-oauth2", "~> 0.8.2"

group :development, :test do
  gem "dotenv-rails", "~> 2.7"
  gem "rspec-rails", "~> 5.1"
  gem "factory_bot_rails", "~> 6.2"

  gem "debug", platforms: %i[ mri mingw x64_mingw ]
end

group :development do
  gem "annotate", "~> 3.2"
  gem "rails-erd", "~> 1.7"
  gem "web-console"
end

group :test do
  gem "shoulda-matchers", "~> 5.1"
end

gem "faker", "~> 2.21"

gem "pundit", "~> 2.2"
