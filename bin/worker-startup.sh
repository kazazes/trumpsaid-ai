#! /bin/bash

cd /var/trumpsaid-wtf

git pull
chown -R node:web /var/trumpsaid-wtf

sudo -u node yarn --pure-lockfile --prefer-offline
sudo -u node yarn build
cd packages/workers
sudo -u node pm2 start dist/worker.js
