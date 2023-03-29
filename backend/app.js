const express = require('express');
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

initMongo(mongoose, process.env.MONGO_URI);

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

// serve static image
app.use('/logo', express.static('public/logos'))

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

const settingProfileRouter = require('./routes/profile');
const settingCourseRouter = require('./routes/course');
app.use('/api/setting/profile', settingProfileRouter);
app.use('/api/setting/course', settingCourseRouter);

module.exports = app;
