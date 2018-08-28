FROM gcr.io/summer-artwork-138223/app:latest
WORKDIR /app
COPY lerna.json .
RUN ls -al
RUN lerna bootstrap
WORKDIR /app/packages/client
RUN yarn run --focus build-prod
