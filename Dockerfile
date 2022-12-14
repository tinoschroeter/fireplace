FROM node:gallium-bullseye-slim AS app

RUN apt-get update && \
    apt-get install youtube-dl -y && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY app .

RUN npm install --production

CMD ["node", "index.js"]
