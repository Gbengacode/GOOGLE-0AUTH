import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import authRouter from './routes/authRouter.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());

// Routes
app.use('/api', authRouter);

// 404 Error Handling
app.all('*', (req, res) => {
  return res.status(404).json({ error: true, message: 'Wrong request path' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
