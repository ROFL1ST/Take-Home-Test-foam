# Backend - Todo Tracker API

Backend REST API untuk aplikasi Todo Tracker yang dibangun menggunakan **Node.js**, **Express.js**, **Sequelize**, dan **SQLite**.

## Tech Stack

- Node.js (ECMAScript Modules)
- Express.js
- Sequelize ORM
- SQLite
- Sequelize CLI

## Project Structure

```text
backend/
├── config/
├── controllers/
├── middlewares/
├── migrations/
├── models/
├── routes/
├── utils/
├── app.js
├── package.json
└── .env.example
```

## Installation

Clone repository terlebih dahulu.

```bash
cd backend
npm install
```

Jalankan database migration.

```bash
npx sequelize-cli db:migrate
```

Jalankan server.

```bash
npm run dev
```

Server akan berjalan di

```text
http://localhost:3001
```

---

## Environment Variables

Buat file `.env`

```env
PORT=3001
```

---

## API Endpoints

### Get All Todos

```http
GET /todos
```

Response

```json
{
  "success": true,
  "message": "Todos retrieved successfully.",
  "data": []
}
```

---

### Create Todo

```http
POST /todos
```

Request Body

```json
{
  "title": "Learn Express",
  "description": "Build REST API"
}
```

---

### Update Todo

```http
PUT /todos/:id
```

Request Body

```json
{
  "completed": true
}
```

---

### Delete Todo

```http
DELETE /todos/:id
```

---

## Validation

- `title` is required
- `description` is optional
- `completed` defaults to `false`

---

## Error Handling

API menggunakan global error handler sehingga seluruh response memiliki format yang konsisten.

Example:

```json
{
  "success": false,
  "message": "Title is required."
}
```