FROM node:carbon-stretch as base
RUN apt-get update -qq && apt-get upgrade -qq
RUN npm i -g npm@latest
RUN mkdir -p /usr/src/trumpsaid.wtf && chown node /usr/src/trumpsaid.wtf
WORKDIR /usr/src/trumpsaid.wtf
