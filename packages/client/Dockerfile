FROM gcr.io/summer-artwork-138223/app:latest
USER root
WORKDIR /app/packages
RUN ls -d */ | grep -v client | grep -v prisma | xargs rm -rf
WORKDIR /app/packages/client
COPY . .
RUN yarn --pure-lockfile --prefer-offline && yarn run build-prod
RUN tar czf dist.tar.gz dist/
CMD [ "echo", "Output is in ./dist and dist.tar.gz.\nExtract it with a bash script or something:\n\ndocker run this:img sh -c cat dist.tar.gz > dist.tar.gz\n" ]
