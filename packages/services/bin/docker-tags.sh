#! /bin/bash
docker build -t ts:worker-base --target worker-base . 
docker build -t ts:base-app --target base-app .
cd docker && docker-compose build
