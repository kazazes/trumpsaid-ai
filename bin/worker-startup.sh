#! /bin/bash

cd /var/trumpsaid-ai

git pull
chown -R node:web /var/trumpsaid-ai

sudo -u node yarn --pure-lockfile --prefer-offline
sudo -u node yarn build
cd packages/workers
sudo -u node NODE_ENV=production pm2 start dist/worker.js --name ts-worker -i 1 --env production
