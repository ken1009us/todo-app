import express, { Request, Response } from 'express';
import prisma from './db/client';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

/**
 * GET /api/todos
 * ----------------------------
 * Fetch all todo items from the database.
 * Sorted by createdAt in descending order.
 *
 * Response:
 *   200 OK
 *   Body: Todo[]
 */
app.get('/api/todos', async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' }
  });
  res.json(todos);
});

/**
 * POST /api/todos
 * ----------------------------
 * Create a new todo item.
 *
 * Request body:
 * {
 *   title: string (required),
 *   dueDate?: string (optional, ISO 8601 date string)
 * }
 *
 * Response:
 *   201 Created
 *   Body: The created Todo item
 *
 * Errors:
 *   400 Bad Request - if title is missing
 */
app.post('/api/todos', (async (req: Request, res: Response) => {
  const { title, dueDate } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const newTodo = await prisma.todo.create({
    data: {
      title,
      dueDate: dueDate ? new Date(dueDate) : undefined,
    }
  });
  res.status(201).json(newTodo);
}) as express.RequestHandler);


/**
 * PUT /api/todos/:id
 * ----------------------------
 * Update the `isDone` status of a todo.
 *
 * Path params:
 *   id: string (Todo ID)
 *
 * Request body:
 * {
 *   isDone: boolean
 * }
 *
 * Response:
 *   200 OK
 *   Body: The updated Todo item
 */
app.put('/api/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isDone } = req.body;

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { isDone }
  });
  res.json(updatedTodo);
});

/**
 * DELETE /api/todos/:id
 * ----------------------------
 * Delete a todo item by ID.
 *
 * Path params:
 *   id: string (Todo ID)
 *
 * Response:
 *   204 No Content
 */
app.delete('/api/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.todo.delete({ where: { id } });
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
