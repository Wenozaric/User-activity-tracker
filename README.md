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

## Быстрый старт (Docker)

```bash
# 1. Склонировать репозиторий
git clone https://github.com/Wenozaric/user-activity-tracker.git
cd user-activity-tracker

# 2. Создать .env из примера
cp .env.example .env
# Отредактируй .env (пароли, секреты, базу данных)

# 3. Запустить всё одной командой
docker-compose up --build
```

## Локальный запуск ( без Docker )

```bash

cd backend
npm install
npm run dev

# Выполните во втором терминале
cd frontend
npm install
npm run dev

```

## Приложение будет доступно:

 - # Backend: http://localhost:5005

 - # Frontend: http://localhost:80


##  ВАЖНО

- Проект **критически зависит** от базы данных PostgreSQL.

- Без работающей БД приложение не запустится и **упадет с ошибкой**

- При **использовании Docker** БД поднимается автоматически (контейнер postgres)

- При **локальном запуске** убедитесь, что PostgreSQL установлен и запущен

- Все переменные подключения к БД **обязательно должны быть заполнены в файле .env**


## Если понравился проект — поставь звезду!
**Автор**: Wenozaric