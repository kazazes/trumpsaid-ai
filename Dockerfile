FROM node:carbon-stretch as base
RUN apt-get update -qq && apt-get upgrade -qq
RUN npm i -g npm@latest
RUN mkdir -p /usr/src/trumpsaid.wtf && chown node /usr/src/trumpsaid.wtf
WORKDIR /usr/src/trumpsaid.wtf
USER node
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-ts
EXPOSE 3000

FROM base as worker
USER root
RUN apt-get install gpac ffmpeg -qq

FROM worker AS worker-dev
USER node
RUN mv .env.docker.worker.dev .env
CMD [ "node", "dist/worker.js" ]

FROM worker AS worker-prod
USER root
RUN npm i -g pm2
USER node
RUN mv .env.docker.worker.prod .env
CMD [ "pm2-runtime", "dist/worker.js" ]

FROM base AS web-dev
USER root
RUN npm i -g webpack webpack-cli
USER node
RUN mv .env.docker.dev .env
RUN webpack --progress
CMD [ "node", "dist/server.js" ]

FROM base AS web-prod
USER root
RUN npm i -g webpack webpack-cli pm2
USER node
RUN mv .env.docker.prod .env
RUN webpack --progress --mode=production
CMD [ "pm2-runtime", "dist/server.js" ]
