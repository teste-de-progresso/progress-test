FROM ruby:3.1.2-alpine

# App variables
ENV APP_PATH /progress-test/
ENV APP_USER progress-test
ENV APP_USER_HOME /home/progress-test
# Bundler variables
ENV BUNDLE_PATH $APP_USER_HOME
ENV GEM_HOME $APP_USER_HOME/bundle
ENV BUNDLE_BIN $GEM_HOME/bin
# Rails variables
ENV RAILS_LOG_TO_STDOUT=true
# System variables
ENV PATH $PATH:$BUNDLE_BIN
# Timezone
ENV TZ=America/Sao_Paulo

# Puma
EXPOSE 3000

# UID of the user that will be created
ARG UID

# Validating if UID argument was provided
RUN : "${UID:?You must provide a UID argument when building this image.}"

# Creating an user so we don't run everything as root
RUN adduser -h $APP_USER_HOME -D -u $UID $APP_USER

# cd to $APP_PATH
WORKDIR $APP_PATH

COPY Gemfile* package.json yarn.lock $APP_PATH

# Installing libraries and gems
# The package shared-mime-info is required in a Rails dependency
# shared-mime-info ref: https://vtex.slack.com/archives/CE16Q9XRT/p1616716948056900
RUN apk update && \
  apk add --no-cache \
    watchman \
    git \
    build-base \
    postgresql-dev \
    tzdata \
    nodejs \
    yarn \
    less \
    bash \
    graphviz \
    shared-mime-info && \
  bundle config jobs $(nproc --all) && \
  bundle install && \
  yarn && \
  chown -R $APP_USER:$APP_USER $APP_USER_HOME && \
  chown -R $APP_USER:$APP_USER $APP_PATH && \
  rm -r /var/cache/apk/*

COPY --chown=progress-test . $APP_PATH

USER $APP_USER
