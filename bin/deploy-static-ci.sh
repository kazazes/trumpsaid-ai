#! /bin/bash

source .env

set -x

gsutil -m rsync -r -d /tmp/client/ gs://trumpsaid-wtf-static/web/
