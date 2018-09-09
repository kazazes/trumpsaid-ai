#! /bin/bash

set -x

source .env
cloudflare.sh -E $CF_ACCOUNT -T $CF_TOKEN --debug -d clear cache trumpsaid.wtf
