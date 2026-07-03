FROM node:22-alpine

WORKDIR /testapp

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGO_DB_USERNAME=root

EXPOSE 5050

CMD ["node", "server.js"]