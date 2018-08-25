FROM node:carbon as dependencies
WORKDIR /app
RUN yarn add global webpack-cli webpack ts-loader typescript pm2
COPY yarn.lock package.json ./
RUN yarn --pure-lockfile

FROM dependencies as build
COPY bin/build.sh bin/
COPY types types
COPY packages packages
COPY packages/server/.env.docker packages/server/
RUN yarn --pure-lockfile
RUN ./bin/build.sh
COPY gc-credentials.json .
RUN rm -rf packages/*/src

FROM build as app
WORKDIR ./packages/server
USER node
EXPOSE 3000
CMD ["yarn", "run", "serve"]
