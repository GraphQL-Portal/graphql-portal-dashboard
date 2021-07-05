#!/bin/sh

concurrently --kill-others-on-fail "yarn workspace graphql-portal-dashboard-frontend useEnv && serve -s packages/frontend/build -l 8080" "yarn workspace graphql-portal-dashboard-backend migrate && yarn start:prod"
