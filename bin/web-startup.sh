#! /bin/bash

export NODE_ENV=production

cd /var/trumpsaid-wtf

git pull
chown -R node:web /var/trumpsaid-wtf

sudo -u node yarn --pure-lockfile --prefer-offline
sudo -u node yarn build
cd /var/trumpsaid-wtf/packages/client/dist
sudo -u node gsutil -m rsync -r -d gs://trumpsaid-wtf-static/web/ .
cd /var/trumpsaid-wtf/packages/server
sudo -u node gsutil cp gs://trumpsaid-wtf-static/env/web.env .env
sudo -u node NODE_ENV=production pm2 start dist/server.js --name ts-web
