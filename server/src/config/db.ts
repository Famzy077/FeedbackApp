import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection
pool.connect((err, client, release) => {
  // Always release the client, even if there's an error
  if (client) {
    release();
  }
  
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  
  console.log('✅ Database connected successfully!');
});

export default pool;