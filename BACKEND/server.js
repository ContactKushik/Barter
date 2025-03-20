import express from 'express';
import dotenv from "dotenv";
dotenv.config();

import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import cors
import authRoutes from './routes/authRoutes.js';
import db from './config/mongoose.js';
import configurePassport from "./config/passport.js";
import passport from 'passport';
import homeRoutes from './routes/homeRoutes.js';

const app = express();

const PORT = process.env.PORT || 8000;

db();
configurePassport(passport);
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());

// Enable CORS for port 5173 with credentials
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/home',homeRoutes);
app.use('/auth',authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
