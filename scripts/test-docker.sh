#!/usr/bin/env bash
set -e

APP_IP=$(docker inspect ai-prompt-manager --format '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}')

if [ -z "$APP_IP" ]; then
  echo "Error: ai-prompt-manager container is not running. Start it with: docker compose up -d"
  exit 1
fi

export SELENIUM_URL=http://localhost:4444
export APP_URL=http://${APP_IP}:3000

echo "Running tests against APP_URL=${APP_URL} via SELENIUM_URL=${SELENIUM_URL}"

rm -rf allure-results
npx cucumber-js
