FROM node:slim

WORKDIR /app/client

COPY package.json .
COPY package-lock.json .

RUN npm i

COPY . .

CMD [ "npm", "run", "dev" ]