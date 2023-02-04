const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

// Initialize .env
dotenv.config();

// Initialize mongodb
const initMongo = require('./configs/db');
initMongo(mongoose, process.env.MONGO_URI);

// Models
const Status = require('./model/status');

// Initialize server
var app = express();

const corsOptions = {
    origin: 'http://localhost:4444',
    credentials: true,
    exposedHeaders: ['Set-Cookie']
}

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Initialize socker.io
const io = new Server(4000, {
    cors: {
        origin: 'http://localhost:4444'
    }
})

const pending = [
    {
        "message": "success"
    }
]

async function test(){
    console.log('in');
    try{
        console.log('save start');
        let d = new Status({organization_id: "3244", status: "pending"});
        const res = await d.save();
        console.log('save end ', res);
    }
    catch(err){
        console.log(err);
    }

}


io.on("connection", (socket) => {
    console.log('test');
    Status.watch().on('change', (data) => {
        console.log('done', data);
        socket.emit("sendPending", data);
    });
});

app.get('/exe', (req, res) => {
    console.log('/exe');
    test();
    return res.status(200).send("success");
})

module.exports = app;
