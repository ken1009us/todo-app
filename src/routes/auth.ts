import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db/client';

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

router.post('/register', async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res.status(400).json({ error: 'Email and password required' });

      if (!isValidEmail(email))
        return res.status(400).json({ error: 'Invalid email format' });

      if (password.length < 8)
        return res.status(400).json({ error: 'Password must be at least 8 characters' });

      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser)
        return res.status(400).json({ error: 'User already exists' });

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token });
    } catch (error: any) {
      console.error('Register error:', error);
      res.status(500).json({ error: 'Server error during registration' });
    }
  });


router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return res.status(400).json({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.status(400).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

export default router;
