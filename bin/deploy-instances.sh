#! /bin/bash

source .env
set -x
gcloud beta compute instance-groups managed rolling-action replace $GOOGLE_INSTANCE_GROUPS_WEB --region=us-east1
