FROM node:20-alpine

WORKDIR /app

COPY . .

WORKDIR /app/notification-server

RUN npm install

EXPOSE 3000

CMD npm start
