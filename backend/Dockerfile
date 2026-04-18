FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm ci

RUN npx prisma generate

RUN npm run build

RUN npm prune --omit=dev

EXPOSE 5005

CMD ["node", "dist/app.js"]