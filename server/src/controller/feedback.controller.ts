import { Request, Response } from 'express';
import { Feedback } from '../schema/feedback';

export const createFeedback = async (req: Request, res: Response) => {
  try {
    const { rating, comment } = req.body;

    // validation
    if (!rating) {
      return res.status(400).json({ message: 'Rating is required.' });
    }

    const newFeedback = new Feedback({ rating, comment });
    await newFeedback.save();

    res.status(201).json({
      message: 'Feedback created successfully.',
      data: newFeedback,
    });  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating feedback.' });
  }
};
