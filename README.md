# User Activity Tracker

Сервис для отслеживания активности пользователей с авторизацией, ежедневной статистикой и встроенным todo-менеджером.

## Технологии

- **Backend**: Node.js, Express, TypeScript, Prisma
- **Database**: PostgreSQL
- **Auth**: Session-based (cookie)
- **Deploy**: Docker, Docker Compose
- **Task scheduling**: node-cron (автосоздание дней)

## Функционал

- Регистрация / Логин (сессии + cookies)
- Ежедневная статистика (автоматическое создание дней через CRON)
- Todo-лист на каждый день
- Метрики продуктивности
- Rate limiting для защиты API
- Docker + .env для безопасного запуска

## Копируем проект

```bash
# 1. Склонировать репозиторий
git clone https://github.com/Wenozaric/user-activity-tracker.git
cd user-activity-tracker

# 2. Создать .env из примера
cp .env.example .env
# Отредактируй .env (пароли, секреты, базу данных)
```

### Локальный запуск (без Docker)

> **Важно:** Для локальной сборки нужно создать базу данных в pgAdmin и заменить в `.env`:
> 
> ```
> DATABASE_URL="postgresql://postgres:ваш_пароль@localhost:5432/user_activity"
> ```
> 
> Вместо `postgresql://postgres:password@postgres:5432/user_activity`

```bash

cd backend
npm install
npx prisma generate
# Копируем .env, иначе призма не запустится
npm run copy-env
npm run dev

# Выполните во втором терминале
cd frontend
npm install
npm run dev

```
## Быстрый запуск ( Docker )

```bash
docker-compose up --build
```

## Приложение будет доступно:

 - Backend: http://localhost:5005

 - Frontend: http://localhost:80 ( Docker )

 - Frontend: http://localhost:5173 ( Vite )


##  ВАЖНО

- Проект **критически зависит** от базы данных PostgreSQL.

- Без работающей БД приложение не запустится и **упадет с ошибкой**

- При **использовании Docker** БД поднимается автоматически (контейнер postgres)

- При **локальном запуске** убедитесь, что PostgreSQL установлен и запущен

- Все переменные подключения к БД **обязательно должны быть заполнены в файле .env**

## Частые проблемы и решения

### Ошибка аутентификации PostgreSQL (password authentication failed)

**Симптомы:** Контейнер с БД падает с ошибкой `FATAL: password authentication failed`

**Причина:** Docker сохранил старый volume с данными БД, где пароль отличается от текущего в `.env`

**Решение:**
```bash
# Остановить все контейнеры и удалить volume с данными БД
docker-compose down -v

# Запустить заново
docker-compose up --build
```

## Если понравился проект — поставь звезду!
**Автор**: Wenozaric