#! /bin/bash
docker tag ts:base gcr.io/summer-artwork-138223/ts-worker
docker tag ts:worker-base gcr.io/summer-artwork-138223/ts-worker
docker tag ts:worker-prod gcr.io/summer-artwork-138223/ts-worker
docker push gcr.io/summer-artwork-138223/ts-worker
