import express from 'express';
import dotenv from 'dotenv';
import searchRoutes from './routes/searchRoutes.js';
import historyRoutes from './routes/historyRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/search', searchRoutes);
app.use('/api/history', historyRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
