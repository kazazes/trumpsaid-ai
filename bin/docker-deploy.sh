#! /bin/bash
docker tag ts:worker-prod gcr.io/summer-artwork-138223/ts-worker
docker push gcr.io/summer-artwork-138223/ts-worker
gcloud app deploy --image-url gcr.io/summer-artwork-138223/ts-worker
