# TODO TERMINAL App

![image](https://github.com/ken1009us/todo-app/blob/main/img/todo.png "todo")


👉 [Todo app Homepage](https://www.todoterminal.site/)


A full-stack terminal-style Todo List app with multi-user support
Built using:

- **Frontend**: Vite + React + Tailwind CSS
- **Backend**: Node.js + Express + Prisma
- **Auth**: JWT-based login system
- **Database**: PostgreSQL
- **Deployment**: Docker-ready

---

## Features

- Create / View / Toggle / Delete todos
- Optional due date with date validation
- User registration & login (JWT auth)
- Terminal-style UI (dark, green text)
- Per-user data isolation (todos by userId)
- Instant UI updates and validation feedback


## Authentication API

```
| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| POST   | `/api/auth/register`| Register a new user  |
| POST   | `/api/auth/login`   | Login and get token  |

> Token (JWT) is stored in `localStorage` and sent with `Authorization: Bearer <token>` in all requests.
```

## Todo API Endpoints (Protected)

```shell
| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| GET    | `/api/todos`     | Get all todos for user    |
| POST   | `/api/todos`     | Add a new todo            |
| PUT    | `/api/todos/:id` | Toggle isDone status      |
| DELETE | `/api/todos/:id` | Delete a todo             |
```

## Workflow Architecture

```shell
+-----------------------------+
|     React Frontend         |
|  Vite + Tailwind + JWT     |
+-------------+---------------+
              |
              | fetch() w/ Authorization: Bearer token
              v
+-------------+---------------+
|     Express API Server      |
| /api/auth/* and /api/todos/*|
+-------------+---------------+
              |
              | Prisma ORM
              v
+-------------+---------------+
|    PostgreSQL (Docker)      |
|  Tables: User, Todo         |
+-----------------------------+
```

## Local Development

### Backend

```shell
cd todo-app
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```shell
cd todo-app/todo-frontend
npm install
npm run dev
```
