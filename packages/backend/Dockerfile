FROM node:12.20.1

WORKDIR /usr/app

COPY package.json ./

COPY ./package-lock.json ./

RUN npm ci

COPY ./ ./

RUN npm run postinstall

RUN npm run build

CMD ["npm", "run", "start:prod"]
