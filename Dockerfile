FROM node:14-alpine

LABEL Description="GraphQL Portal Dashboard" Vendor="GraphQL Portal"

WORKDIR /usr/app

# Copy all package.json files, including those from backend
COPY package.json yarn.lock ./
RUN mkdir -p packages/{frontend,backend}
COPY packages/frontend/package.json ./packages/frontend/
COPY packages/backend/package.json ./packages/backend/

# Install packages
RUN yarn install --frozen-lockfile --silent
RUN yarn global add serve concurrently

# Build
COPY ./ ./
RUN yarn build
 --kill-others-on-fail "serve -s packages/frontend/build -l 8080" "yarn start:prod"

EXPOSE 3030
EXPOSE 8080

ENV NODE_ENV production

CMD ["concurrently", "--kill-others-on-fail", "\"serve -s packages/frontend/build -l 8080\"", "\"yarn start:prod\""]
