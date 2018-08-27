#! /bin/bash

set -a

docker build -t ts:base --pull --target base .
docker build -t ts:node-deps --target deps .
docker build -t ts:built --target build .
docker build -t ts:worker-deps --target worker-deps .
docker build -t ts:app --target app .
docker build -t ts:worker --target worker .
