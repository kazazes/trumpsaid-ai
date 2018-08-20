#! /bin/bash
docker build -t ts:base --target base .
docker build -t ts:worker --target worker .
# docker build -t ts:worker-dev --target worker-dev ..
docker build -t ts:worker-prod --target worker-prod .
docker build -t ts:web-prod --target web-prod .
# docker build -t ts:web-dev --target web-dev ..
