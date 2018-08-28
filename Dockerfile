FROM node:8-stretch as base
WORKDIR /app

FROM ts:base as deps
WORKDIR /app
RUN yarn global add webpack-cli webpack typescript pm2
COPY yarn.lock package.json ./
RUN yarn --pure-lockfile

# TODO: Copy individual package.json, strip local packages, install before copy
FROM ts:node-deps as build
WORKDIR /app
COPY bin/build-sources.sh bin/
COPY types types
COPY packages packages
RUN yarn --pure-lockfile --prefer-offline && ./bin/build-sources.sh

FROM ts:built as app
WORKDIR /app/packages/server
RUN touch .env
USER node
EXPOSE 3000
CMD ["yarn", "run", "serve"]

FROM ts:built as worker-deps
WORKDIR /app
RUN rm -rf packages/client packages/graphql packages/prisma packages/server
RUN touch .env
USER root
RUN apt-get -qq update && apt-get -q -y install gpac ffmpeg python-pip && rm -rf /var/lib/apt/lists/* && pip --no-cache-dir install youtube-dl

FROM ts:worker-deps as worker
WORKDIR /app/packages/workers
USER node
EXPOSE 3000
CMD ["yarn", "run", "serve"]
