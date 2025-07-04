import express from 'express';
import cors from 'cors';
import prisma from './db/client';
import authRoutes from './routes/auth';
import path from 'path';
import { authenticateToken, AuthRequest } from './middleware/auth';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/api/todos', authenticateToken, async (req: AuthRequest, res) => {
  const todos = await prisma.todo.findMany({
    where: { userId: req.userId },
    orderBy: { createdAt: 'desc' },
  });
  res.json(todos);
});

app.post('/api/todos', authenticateToken, async (req: AuthRequest, res) => {
  const { title, dueDate } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const newTodo = await prisma.todo.create({
    data: {
      title,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      userId: req.userId!,
    },
  });
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', authenticateToken, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { isDone } = req.body;

  const updated = await prisma.todo.updateMany({
    where: { id, userId: req.userId },
    data: { isDone },
  });

  if (updated.count === 0) return res.status(404).json({ error: 'Todo not found' });

  res.json({ success: true });
});

app.delete('/api/todos/:id', authenticateToken, async (req: AuthRequest, res) => {
  const { id } = req.params;

  const deleted = await prisma.todo.deleteMany({
    where: { id, userId: req.userId },
  });

  if (deleted.count === 0) return res.status(404).json({ error: 'Todo not found' });

  res.status(204).end();
});

const frontendPath = path.join(process.cwd(), 'public');

app.use(express.static(frontendPath));
app.get('/{*any}', (_, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
