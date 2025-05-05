import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import userRoutes from './routes/userRoutes.js';
import actorRoutes from './routes/actorRoutes.js';
import producerRoutes from './routes/producerRoutes.js';
import movieRoutes from './routes/movieRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

app.use('/', userRoutes);
app.use('/movie', movieRoutes);
app.use('/actor', actorRoutes);
app.use('/producer', producerRoutes);

app.get('/', (req, res) => {
  res.send('Imdb API is running....');
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
