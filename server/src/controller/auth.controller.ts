import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import pool from '../config/db';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleSignIn = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    // 1. Verify the token from Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).json({ message: 'Invalid Google token.' });
    }

    const { sub: google_id, email, name } = payload;

    // 2. Check if user exists in our database
    let user = (await pool.query('SELECT * FROM users WHERE google_id = $1', [google_id])).rows[0];

    // 3. If user doesn't exist, create them
    if (!user) {
      user = (await pool.query(
        'INSERT INTO users (google_id, email, name) VALUES ($1, $2, $3) RETURNING *',
        [google_id, email, name]
      )).rows[0];
    }

    // 4. Create our own JWT for the user
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' } // Token expires in 7 days
    );

    // 5. Send the JWT back to the client
    res.status(200).json({ token: jwtToken });

  } catch (error) {
    console.error('Google Sign-In Error:', error);
    res.status(500).json({ message: 'Authentication failed.' });
  }
};