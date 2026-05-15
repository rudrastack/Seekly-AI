import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';


const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/auth', authRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


export default app;