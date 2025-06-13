# NutriGo Backend

API на Node.js и Express. Поддерживается авторизация и хранение меню и заказов в PostgreSQL.

## Настройка

Требуется PostgreSQL. Строка подключения берётся из переменной `DATABASE_URL` (по умолчанию `postgres://postgres:postgres@localhost/nutrigo`).

```bash
cd backend
npm install
```

## Запуск

```bash
npm start
```

Сервер запустится на `http://localhost:3000`.

## Эндпоинты

- `POST /login` – авторизация, принимает `username` и `password`, возвращает `token`.
- `GET /menu` – список блюд из базы данных.
- `POST /orders` – создание заказа (нужен заголовок `Authorization: Bearer <token>`).
- `GET /orders` – получение заказов пользователя (также требует токен).
