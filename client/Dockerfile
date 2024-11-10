FROM node:23-alpine AS builder

WORKDIR /app

COPY package.json package*.json ./ 

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173 

CMD [ "npm", "run", "preview" ]
