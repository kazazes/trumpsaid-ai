#! /bin/bash

set -a

docker tag app gcr.io/summer-artwork-138223/app:latest
docker tag worker gcr.io/summer-artwork-138223/worker:latest
docker tag client gcr.io/summer-artwork-138223/client:latest

docker push gcr.io/summer-artwork-138223/app:latest
docker push gcr.io/summer-artwork-138223/worker:latest
docker push gcr.io/summer-artwork-138223/client:latest
