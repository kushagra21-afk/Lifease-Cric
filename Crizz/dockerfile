
FROM node:16

WORKDIR /cricbuzz

COPY package*.json ./

RUN npm install

RUN npm start

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]