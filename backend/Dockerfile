FROM node:20-alpine

WORKDIR /app

# Копируем package.json
COPY package*.json ./

# Устанавливаем зависимости (включая dev, нужны для сборки)
RUN npm ci

# Копируем Prisma и генерируем клиент
COPY prisma ./prisma/
RUN npx prisma generate

# Копируем исходники
COPY . .

# Собираем TypeScript в JavaScript
RUN npm run build

# Удаляем dev-зависимости (оставляем только production)
RUN npm prune --omit=dev

EXPOSE 5005

# Запускаем скомпилированный код из dist
CMD ["node", "dist/app.js"]