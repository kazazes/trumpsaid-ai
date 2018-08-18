FROM node:8

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-prod

EXPOSE 3000
EXPOSE 9229

CMD [ "npm", "run", "debug" ]
