FROM node:8-alpine
RUN apk add --no-cache python g++ make
WORKDIR /app
RUN yarn global add --pure-lockfile typescript pm2
COPY types types
COPY bin/build-sources.sh bin/
COPY packages/client/package.json packages/client/package.json
COPY packages/common/package.json packages/common/package.json
COPY packages/graphql/package.json packages/graphql/package.json 
COPY packages/prisma/package.json packages/prisma/package.json 
COPY packages/pubsub/package.json packages/pubsub/package.json 
COPY packages/responders/package.json packages/responders/package.json 
COPY packages/server/package.json packages/server/package.json 
COPY yarn.lock package.json lerna.json ./
RUN yarn --pure-lockfile
COPY packages packages
RUN rm -rf packages/workers
RUN yarn --pure-lockfile && ./bin/build-sources.sh && rm -rf packages/*/src node_modules packages/*/node_modules && \
  yarn global remove typescript && yarn install --prod --pure-lockfile && yarn cache clean && \
  apk del python g++ make
WORKDIR /app/packages/server
COPY *credentials.json .
RUN touch .env
USER node
EXPOSE 3000
CMD ["pm2-runtime", "-i", "0", "dist/server.js"]
