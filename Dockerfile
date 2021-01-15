FROM node:14

WORKDIR /usr/app

COPY ./ ./

RUN yarn install --frozen-lockfile

RUN yarn build

CMD ["yarn", "backend"]
