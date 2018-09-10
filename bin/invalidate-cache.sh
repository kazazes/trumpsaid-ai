#! /bin/bash

source .env
set -x

cloudflare.sh -E $CF_ACCOUNT -T $CF_TOKEN -d clear cache trumpsaid.wtf
