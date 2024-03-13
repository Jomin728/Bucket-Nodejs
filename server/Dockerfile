FROM node:20-alpine

WORKDIR /app

COPY . .

VOLUME ["/app/server/uploads" ]

WORKDIR /app/server

RUN npm install

EXPOSE 8000

CMD npm start
