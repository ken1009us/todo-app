# TODO TERMINAL App

A full-stack terminal-style Todo List app built with:

- **Frontend**: Vite + React + Tailwind CSS
- **Backend**: Node.js + Express + Prisma
- **Database**: PostgreSQL
- **Deployment**: Docker-ready, Vercel or Fly.io friendly

## Features

- Create / View / Toggle / Delete todos
- Optional due date with validation
- Cool "terminal theme" UI
- Fully RESTful backend API
- Input validation and instant UI update

## API Endpoints

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| GET    | `/api/todos`     | Get all todos             |
| POST   | `/api/todos`     | Add a new todo            |
| PUT    | `/api/todos/:id` | Toggle isDone status      |
| DELETE | `/api/todos/:id` | Delete a todo             |

## Database Design

![DB Schema](db_schema.png)

**Table: Todo**
- `id`: UUID, primary key
- `title`: task content (required)
- `isDone`: completion status
- `createdAt`: timestamp
- `dueDate`: optional deadline

## Workflow Architecture

```shell
+-----------------------------+
|     User Interface          |
|  React + Tailwind (Vite)    |
+-------------+---------------+
              |
              | fetch() calls (GET, POST, PUT, DELETE)
              v
+-------------+---------------+
|         Express API         |
|  REST Endpoints (/api/todos)|
+-------------+---------------+
              |
              | Prisma ORM
              v
+-------------+---------------+
|       PostgreSQL Database   |
|Table: Todo (id, title, etc.)|
+-----------------------------+
```

## 🚀 Run Locally

### Backend

```bash
cd todo-app
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd todo-app/todo-frontend
npm install
npm run dev
```

