#! /bin/bash

# Bootstraps a Debian 9 instance
apt-get install apt-transport-https -yy

## Add Node 8.x repository
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
## Add yarn repository
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

## Install build dependencies, ffmpeg, node, youtube-dl, yarn, TS and PM2
apt-get update
apt-get install -yy locales build-essential ffmpeg yarn nodejs git
yarn global add --pure-lockfile typescript pm2

## Create node user
adduser node --gecos "First Last,RoomNumber,WorkPhone,HomePhone" --disabled-password
adduser node web

## Clone trumpsaid-wtf
cd /var/
git clone https://github.com/kazazes/trumpsaid-wtf
chown -R node:web trumpsaid-wtf
cd /var/trumpsaid-wtf/
## Remove non-essential packages for workers
rm -rf packages/workers
sudo -u node yarn --pure-lockfile --prefer-offline

## Build
sudo -u node ./bin/build-sources.sh
cd packages/server
sudo -u node touch .env
