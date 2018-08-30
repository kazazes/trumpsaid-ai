#! /bin/bash

set -a

docker build -t app --cache-from gcr.io/summer-artwork-138223/app:latest -f server-slim.dockerfile .
docker build -t worker --cache-from --cache-from gcr.io/summer-artwork-138223/worker:latest -f worker.dockerfile .
