FROM gcr.io/summer-artwork-138223/app:latest
USER root
RUN yarn global add webpack-cli webpack lerna
WORKDIR /app
RUN lerna bootstrap
WORKDIR /app/packages/client
RUN yarn run --focus build-prod
RUN tar czf dist.tar.gz dist/
CMD [ "cat", "dist.tar.gz" ]
