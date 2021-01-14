FROM node:12.20.1

WORKDIR /usr/app

COPY ./ ./

RUN yarn install --frozen-lockfile

CMD ["yarn", "backend"]
