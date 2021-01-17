FROM node:14

LABEL Description="GraphQL Portal Dashboard" Vendor="GraphQL Portal"

WORKDIR /usr/app

COPY ./ ./

RUN yarn install --frozen-lockfile

RUN yarn build

EXPOSE 3030

ENV NODE_ENV production

CMD ["yarn", "start:prod"]
