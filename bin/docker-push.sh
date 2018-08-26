#! /bin/bash

docker tag ts:app gcr.io/summer-artwork-138223/ts-app
docker tag ts:worker gcr.io/summer-artwork-138223/ts-worker
docker push gcr.io/summer-artwork-138223/ts-app
docker push gcr.io/summer-artwork-138223/ts-worker
