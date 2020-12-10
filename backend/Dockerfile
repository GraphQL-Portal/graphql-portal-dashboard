FROM node:12.18.3

WORKDIR /usr/app

COPY package.json ./

COPY ./package-lock.json ./

RUN npm ci

COPY ./ ./

RUN npm run postinstall

RUN npm run build

CMD ["npm", "run", "start:prod"]
