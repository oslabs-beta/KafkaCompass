FROM node:16.17

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000