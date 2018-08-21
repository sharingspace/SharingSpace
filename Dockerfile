FROM ubuntu:18.04

RUN cachebuster=324803294802

# RUN apt-get -qq install -y sudo
RUN apt-get -qq update
RUN apt-get -qq -y install curl
RUN apt-get -qq install -my wget gnupg

# Install Ruby.
RUN \
  apt-get update && \
  apt-get install -y ruby

RUN apt-get install -y rubygems-integration inotify-tools
RUN gem install sass -v 3.3.14

# Yarn install
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update
RUN apt install -qq -y yarn

RUN mkdir /app
WORKDIR /app
COPY ./app /app

RUN rm -rf node_modules
RUN yarn --pure-lockfile
