FROM node:carbon-stretch
USER root
WORKDIR /app
RUN  yarn global add --pure-lockfile typescript pm2
COPY bin/build-sources.sh bin/
COPY yarn.lock package.json lerna.json ./
COPY packages/client/package.json packages/client/package.json
COPY packages/common/package.json packages/common/package.json
COPY packages/graphql/package.json packages/graphql/package.json 
COPY packages/prisma/package.json packages/prisma/package.json 
COPY packages/pubsub/package.json packages/pubsub/package.json 
COPY packages/responders/package.json packages/responders/package.json 
COPY packages/server/package.json packages/server/package.json 
RUN yarn --pure-lockfile
COPY packages packages
RUN ./bin/build-sources.sh && yarn cache clean
WORKDIR /app/packages/server
RUN touch .env
USER node
EXPOSE 3000
CMD ["pm2-runtime", "-i", "0", "dist/server.js"]
