FROM node:alpine

RUN mkdir /mercado-libre

WORKDIR /mercado-libre

COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]