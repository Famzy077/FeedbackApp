import { Request, Response } from 'express';
import pool from '../config/db';

export const createFeedback = async (req: Request, res: Response) => {
  try {
    const { rating, category, comment, email } = req.body;

    // Basic validation
    if (!rating || !category) {
      return res.status(400).json({ message: 'Rating and category are required.' });
    }

    const newFeedback = await pool.query(
      'INSERT INTO feedback (rating, category, comment, email) VALUES ($1, $2, $3, $4) RETURNING *',
      [rating, category, comment, email]
    );

    res.status(201).json(newFeedback.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating feedback.' });
  }
};