FROM node:carbon-stretch
USER root
WORKDIR /tmp
RUN git clone https://github.com/gpac/gpac.git && cd gpac && ./configure --static-mp4box --use-zlib=no && make -j4 && make install
WORKDIR /app
RUN rm -rf /tmp/gpac && apt-get -qq update && apt-get -q -y install ffmpeg python-pip && \
  rm -rf /var/lib/apt/lists/* && pip --no-cache-dir install youtube-dl && \
  yarn global add --pure-lockfile typescript pm2
COPY bin/build-sources.sh bin/
COPY yarn.lock package.json lerna.json ./
COPY packages/prisma/package.json packages/prisma/package.json
COPY packages/pubsub/package.json packages/pubsub/package.json 
COPY packages/workers/package.json packages/workers/package.json 
COPY packages/common/package.json packages/common/package.json
RUN yarn --pure-lockfile
COPY packages packages
RUN rm -rf packages/client packages/graphql packages/responders packages/server
RUN ./bin/build-sources.sh && yarn cache clean
WORKDIR /app/packages/workers
RUN touch .env
USER node
CMD ["pm2-runtime", "-i", "1", "dist/worker.js"]
