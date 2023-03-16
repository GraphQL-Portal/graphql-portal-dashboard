FROM node:19-alpine

LABEL Description="GraphQL Portal Dashboard" Vendor="GraphQL Portal"

WORKDIR /usr/app

# Install global packages
RUN yarn global add serve concurrently

# Copy all package.json files, including those from backend
COPY package.json ./
COPY yarn.lock ./
RUN mkdir -p packages/frontend && mkdir -p packages/backend
COPY packages/frontend/package.json ./packages/frontend/
COPY packages/backend/package.json ./packages/backend/
COPY packages/backend/config ./packages/backend/config

# Install packages
RUN yarn install --frozen-lockfile # --silent

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
ENV REACT_APP_DEFAULT_ADMIN_EMAIL "admin@example.com"
ENV REACT_APP_DEFAULT_ADMIN_PASSWORD "Secret123!"

# Build
COPY ./ ./
RUN yarn build

EXPOSE 3030
EXPOSE 8080

ADD start.sh ./
RUN chmod +x ./start.sh

CMD ["./start.sh"]
