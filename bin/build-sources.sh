#! /bin/bash

set -a

cd packages/prisma
yarn run --focus build-prod
cd ../common
yarn run --focus build-prod
cd ../workers
yarn run --focus build-prod
cd ../graphql
yarn run --focus build-prod
cd ../server
yarn run --focus build-prod
