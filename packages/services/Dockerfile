FROM ts:base as worker-base
USER root
RUN apt-get install gpac ffmpeg -qq

FROM ts:base AS base-app
USER node
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build-ts
EXPOSE 3000

FROM ts:worker-base AS worker-dev
USER node
RUN mv docker/.env.docker.worker.dev .env
EXPOSE 9229
CMD [ "npm", "run", "debug-remote" ]

FROM ts:worker-base AS worker-prod
USER root
RUN npm i -g pm2
USER node
RUN mv ./docker/.env.docker.worker.prod .env
CMD [ "pm2-runtime", "dist/worker.js" ]

FROM ts:base-app AS web-dev
USER root
USER node
RUN mv ./docker/.env.docker.dev .env
RUN npx webpack --progress
CMD [ "node", "dist/server.js" ]

FROM base-app AS web-prod
USER root
RUN npm i -g webpack webpack-cli pm2
USER node
RUN mv ./docker/.env.docker.prod .env
RUN webpack --progress --mode=production
CMD [ "pm2-runtime", "dist/server.js" ]
