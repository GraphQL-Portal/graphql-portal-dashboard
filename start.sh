#!/bin/sh

concurrently --kill-others-on-fail "PORT=8080 HOST=0.0.0.0 yarn frontend" "yarn workspace graphql-portal-dashboard-backend migrate && yarn start:prod"
