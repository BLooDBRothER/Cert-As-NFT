const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Initialize mongodb
const initMongo = require('./configs/db');

// Initialize passport
const initPassport = require('./middleware/jwt');
initPassport(passport, process.env.JWT_SECRET)

initMongo(mongoose, process.env.MONGO_URI)

const authRouter = require('./routes/auth.routes');

const app = express();

const corsOptions = {
    origin: ['http://localhost:5173', 'http://nftcert.org:5173'],
    credentials: true,
    exposedHeaders: ['Set-Cookie']
}

app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authRouter);

module.exports = app;
