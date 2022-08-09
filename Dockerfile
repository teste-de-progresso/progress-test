FROM ruby:3.1.2-slim-bullseye

ENV TZ=America/Sao_Paulo

ENV APP_PATH /progress-test/
ENV APP_USER progress-test
ENV APP_USER_HOME /home/progress-test

ENV NODE_VERSION 16.14.2
ENV NVM_DIR /usr/local/nvm

ENV BUNDLE_PATH $APP_USER_HOME
ENV GEM_HOME $APP_USER_HOME/bundle
ENV BUNDLE_BIN $GEM_HOME/bin
ENV PATH $PATH:$BUNDLE_BIN

ENV RAILS_LOG_TO_STDOUT=true

EXPOSE 3000

ARG UID

RUN : "${UID:?You must provide a UID argument when building this image.}"

RUN adduser --home $APP_USER_HOME --disabled-password --uid $UID --shell /bin/bash $APP_USER

WORKDIR $APP_PATH

COPY Gemfile* package.json yarn.lock $APP_PATH

# Installing packages, gems and node modules
# The package shared-mime-info is required in a Rails dependency
# shared-mime-info ref: https://vtex.slack.com/archives/CE16Q9XRT/p1616716948056900

RUN rm /bin/sh && ln -s /bin/bash /bin/sh && \
  apt-get update && apt-get -y upgrade && \
  apt-get -y install build-essential bash libxml2-dev libxslt1-dev musl-dev \
  shared-mime-info git curl tzdata wget gnupg2 lsb-release dh-autoreconf graphviz watchman && \
  ln -s /usr/lib/x86_64-linux-musl/libc.so /lib/libc.musl-x86_64.so.1 && \
  mkdir -p $NVM_DIR && \
  curl --silent -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash && \
  source $NVM_DIR/nvm.sh && \
  nvm install $NODE_VERSION && \
  nvm alias default $NODE_VERSION && \
  nvm use default

RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list' && \
  wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add - && \
  apt-get update &&  apt-get install -y libpq5 libpq-dev postgresql-client-13 postgresql-server-dev-13

ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

RUN npm install -g yarn && yarn && \
  bundle config git.allow_insecure true && \
  bundle config jobs $(nproc --all) && \
  bundle install && \
  chown -R $APP_USER:$APP_USER $APP_USER_HOME && \
  chown -R $APP_USER:$APP_USER $APP_PATH && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --chown=progress-test . $APP_PATH

USER $APP_USER
