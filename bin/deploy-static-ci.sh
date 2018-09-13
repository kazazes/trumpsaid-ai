#! /bin/bash

source .env

set -x

gsutil -m rsync -r -d packages/client/dist/ gs://trumpsaid-wtf-static/web/
