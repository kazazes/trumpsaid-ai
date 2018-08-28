FROM gcr.io/summer-artwork-138223/app:latest
USER root
WORKDIR /app/packages
RUN ls -d */ | grep -v client | grep -v prisma | xargs rm -rf
WORKDIR /app/packages/client
COPY . .
RUN yarn --pure-lockfile && yarn run build-prod
RUN tar czf dist.tar.gz dist/ && mkdir /static && mv dist.tar.gz /static
WORKDIR /static
RUN rm -rf /app
CMD [ "echo", "Output is in ./dist and dist.tar.gz.\nExtract it with a bash script or something:\n\ndocker run this:img bash -c cat dist.tar.gz > dist.tar.gz\n" ]
