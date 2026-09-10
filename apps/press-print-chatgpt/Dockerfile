FROM node:22-alpine

WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev=false

COPY tsconfig.json ./
COPY src ./src
COPY assets ./assets

ENV NODE_ENV=production
ENV PORT=8000
EXPOSE 8000

CMD ["npm", "start"]
