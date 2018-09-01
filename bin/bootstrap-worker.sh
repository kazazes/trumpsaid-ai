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
apt-get install -yy locales build-essential git ffmpeg python-pip yarn nodejs
pip install youtube-dl
yarn global add --pure-lockfile typescript pm2

## Generate locales
export DEBIAN_FRONTEND=noninteractive
locale-gen en_US.UTF-8 en_us
dpkg-reconfigure locales
locale-gen C.UTF-8
/usr/sbin/update-locale LANG=C.UTF-8
export LANG=C.UTF-8
export LANGUAGE=C.UTF-8
export LC_ALL=C.UTF-8

## Make gpac (MP4Box) from source
cd /tmp/
git clone https://github.com/gpac/gpac.git && cd gpac && ./configure --static-mp4box --use-zlib=no && make -j4 && make install

## Create node user
adduser node --gecos "First Last,RoomNumber,WorkPhone,HomePhone" --disabled-password
adduser node web

## Clone trumpsaid-wtf
cd /var/
git clone https://github.com/kazazes/trumpsaid-wtf
chown -R node:web trumpsaid-wtf
cd /var/trumpsaid-wtf/
## Remove non-essential packages for workers
rm -rf packages/client packages/graphql packages/responders packages/server
sudo -u node yarn --pure-lockfile --prefer-offline

## Build
sudo -u node ./bin/build-sources.sh
cd packages/workers
sudo -u node touch .env
