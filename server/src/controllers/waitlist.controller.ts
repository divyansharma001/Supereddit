import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';

export const addToWaitlist = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Valid email is required.' });
  }
  try {
    const entry = await prisma.waitlist.create({
      data: { email },
    });
    return res.status(201).json({ message: 'Added to waitlist!', entry });
  } catch (error: any) {
    if (error.code === 'P2002') {
      // Unique constraint failed
      return res.status(409).json({ error: 'Email already on waitlist.' });
    }
    return res.status(500).json({ error: 'Internal server error.' });
  }
}; 