FROM node:carbon-stretch
USER root
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update -qq && apt-get install -y locales -qq && locale-gen en_US.UTF-8 en_us && dpkg-reconfigure locales && dpkg-reconfigure locales && locale-gen C.UTF-8 && /usr/sbin/update-locale LANG=C.UTF-8
ENV LANG C.UTF-8
ENV LANGUAGE C.UTF-8
ENV LC_ALL C.UTF-8
WORKDIR /tmp
RUN git clone https://github.com/gpac/gpac.git && cd gpac && ./configure --static-mp4box --use-zlib=no && make -j4 && make install
WORKDIR /app
RUN rm -rf /tmp/gpac && apt-get install -y locales ffmpeg python-pip -qq && \
  rm -rf /var/lib/apt/lists/* && pip --no-cache-dir install youtube-dl && \
  yarn global add --pure-lockfile typescript pm2 
COPY bin/build-sources.sh bin/
COPY yarn.lock package.json lerna.json ./
COPY packages/prisma/package.json packages/prisma/package.json
COPY packages/pubsub/package.json packages/pubsub/package.json 
COPY packages/workers/package.json packages/workers/package.json 
COPY packages/common/package.json packages/common/package.json
RUN yarn --pure-lockfile --prefer-offline
COPY packages packages
RUN rm -rf packages/client packages/graphql packages/responders packages/server
RUN ./bin/build-sources.sh
WORKDIR /app/packages/workers
RUN touch .env
USER node
EXPOSE 3001
CMD ["pm2-runtime", "-i", "1", "dist/worker.js"]
