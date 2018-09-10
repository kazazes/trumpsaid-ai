#! /bin/bash

source .env

set -x

gsutil -m rsync -r -d packages/client/dist/ gs://trumpsaid-wtf-static/web/
gsutil cp packages/server/.env.gce gs://trumpsaid-wtf-static/env/web.env
gcloud compute scp --compress --recurse packages/client/dist/* $PRIMARY_LB_CONNECTION_STRING:/var/www/static/
