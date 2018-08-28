FROM node:8-stretch as base
WORKDIR /app

FROM base as node-deps
WORKDIR /app
RUN yarn global add webpack-cli webpack typescript pm2 lerna
COPY yarn.lock package.json lerna.json ./
RUN yarn --pure-lockfile

FROM node-deps as build
WORKDIR /app
COPY bin/build-sources.sh bin/
COPY types types
COPY packages packages
RUN yarn --pure-lockfile --prefer-offline && ./bin/build-sources.sh

FROM build as app
WORKDIR /app/packages/server
RUN touch .env
USER node
EXPOSE 3000
CMD ["yarn", "run", "serve"]

