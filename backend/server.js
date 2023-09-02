import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';
import deckRoutes from './routes/deckRoutes.js';
import cardRoutes from './routes/cardRoutes.js';

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/decks', deckRoutes);
app.use('/api/cards', cardRoutes);

app.get('/', (req, res) => res.send('Server je spreman.'))

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server je na portu ${port}.`))