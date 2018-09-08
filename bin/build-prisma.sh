#! /bin/sh

set -e
cd ./packages/prisma/database/
source .env.prisma.prod
docker-compose build --compress --force-rm --no-cache --pull
