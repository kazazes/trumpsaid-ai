#! /bin/sh

set -a

ROOT=$PWD

if [ -d "$ROOT/packages/prisma" ]; then
  cd $ROOT/packages/prisma
  echo "Building @trumpsaid/prisma"
  yarn run --focus build-prod
fi

if [ -d "$ROOT/packages/common" ]; then
  cd $ROOT/packages/common
  echo "Building @trumpsaid/common"
  yarn run --focus build-prod
fi

if [ -d "$ROOT/packages/narnia" ]; then
  echo "I'm in narnia"
  sleep 500
fi

if [ -d "$ROOT/packages/pubsub" ]; then
  cd $ROOT/packages/pubsub
  echo "Building @trumpsaid/pubsub"
  yarn run --focus build-prod
fi

if [ -d "$ROOT/packages/responders" ]; then
  cd $ROOT/packages/responders
  echo "Building @trumpsaid/responders"
  yarn run --focus build-prod
fi

if [ -d "$ROOT/packages/workers" ]; then
  cd $ROOT/packages/workers
  echo "Building @trumpsaid/workers"
  yarn run --focus build-prod
fi

if [ -d "$ROOT/packages/graphql" ]; then
  cd $ROOT/packages/graphql
  echo "Building @trumpsaid/graphql"
  yarn run --focus build-prod
fi

if [ -d "$ROOT/packages/server" ]; then
  cd ../server
  echo "Building @trumpsaid/server"
  yarn run --focus build-prod
fi

if [ -d "$ROOT/packages/client" ]; then
  cd ../client
  echo "Building @trumpsaid/client"
  yarn run --focus build-prod
fi
