FROM gcr.io/summer-artwork-138223/app:latest
WORKDIR /app
USER root
RUN rm -rf packages/client packages/graphql packages/prisma packages/server
RUN touch .env
RUN apt-get -qq update && apt-get -q -y install gpac ffmpeg python-pip && rm -rf /var/lib/apt/lists/* && pip --no-cache-dir install youtube-dl
WORKDIR /app/packages/workers
USER node
EXPOSE 3000
CMD ["yarn", "run", "serve"]
