import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';
import chatRoutes from './routes/chat.route.js';


const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);


export default app;