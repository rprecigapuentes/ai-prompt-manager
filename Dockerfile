FROM node:18-alpine

WORKDIR /app

# Copy dependency manifests first to leverage Docker layer cache
COPY package*.json ./

# Install build tools needed by better-sqlite3 (native module)
RUN apk add --no-cache python3 make g++

RUN npm ci --omit=dev

# Remove build tools after install to keep image small
RUN apk del python3 make g++

# Copy the rest of the application
COPY app.js ./
COPY src/ ./src/
COPY views/ ./views/
COPY public/ ./public/

EXPOSE 3000

CMD ["node", "app.js"]
