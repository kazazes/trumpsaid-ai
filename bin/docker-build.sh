#! /bin/bash

set -a

docker build -t app -f server-slim.dockerfile .
docker build -t worker -f worker.dockerfile .
