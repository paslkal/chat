FROM node

WORKDIR /app/client

COPY package.json .
COPY package-lock.json .

RUN npm i

CMD [ "npm", "run", "dev" ]