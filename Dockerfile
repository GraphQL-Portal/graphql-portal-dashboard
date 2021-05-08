FROM node:16-alpine

LABEL Description="GraphQL Portal Dashboard" Vendor="GraphQL Portal"

WORKDIR /usr/app

# Copy all package.json files, including those from backend
COPY package.json ./
COPY yarn.lock ./
RUN mkdir -p packages/frontend && mkdir -p packages/backend
COPY packages/frontend/package.json ./packages/frontend/
COPY packages/backend/package.json ./packages/backend/
COPY packages/backend/config ./packages/backend/config

# Install packages
RUN yarn install --frozen-lockfile # --silent
RUN yarn global add serve concurrently

# Build
COPY ./ ./
RUN yarn build

EXPOSE 3030
EXPOSE 8080

ENV NODE_ENV production
ENV DASHBOARD_SECRET ""
ENV HOST localhost
ENV DASHBOARD_PORT 3030
ENV PUBLIC_HOST "http://localhost:8080"
ENV JWT_SECRET "defaultSecret"
ENV DEFAULT_ADMIN_EMAIL "admin@example.com"
ENV DEFAULT_ADMIN_PASSWORD "Secret123!"
ENV METRICS_ENABLED true
ENV CRYPTO_SECRET sMVzaYsaR9wM5R9cxLpJgjvqH9w6Ynlw
ENV REDIS_CONNECTION_STRING "redis://localhost:6379"
ENV MONGODB_CONNECTION_STRING "mongodb://localhost:27017/graphql-portal-dashboard"
ENV REACT_APP_DASHBOARD_URL "http://localhost:3030/graphql"
ENV REACT_APP_DASHBOARD_WS_URL "$REACT_APP_DASHBOARD_URL"

CMD ["concurrently", "--kill-others-on-fail", "\"serve -s packages/frontend/build -l 8080\"", "\"yarn workspace graphql-portal-dashboard-backend migrate && yarn start:prod\""]
