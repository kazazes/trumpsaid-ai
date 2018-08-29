#! /bin/bash

source .env
gcloud compute scp --compress --recurse packages/client/dist/* $PRIMARY_LB_CONNECTION_STRING:/var/www/static/
