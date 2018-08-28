FROM node:8-stretch as base
WORKDIR /app
RUN yarn global add typescript pm2
COPY yarn.lock package.json lerna.json ./
RUN yarn --pure-lockfile
COPY bin/build-sources.sh bin/
COPY types packages ./
RUN yarn --pure-lockfile --prefer-offline && ./bin/build-sources.sh
WORKDIR /app/packages/server
RUN touch .env
USER node
EXPOSE 3000
CMD ["yarn", "run", "serve"]

