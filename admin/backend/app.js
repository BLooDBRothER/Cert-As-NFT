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
const Organization = require('./model/organization');

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

io.on("connection", (socket) => {
    console.log('test');
    Status.watch().on('change', async (data) => {
        console.log('done', data);
        if(data.operationType === "insert"){
            const organization = await Organization.findOne({"_id": data.fullDocument.organization_id});
            const resData = {
                id: data.fullDocument._id,
                organization_id: organization.organization_id,
                organization_name: organization.organization_name,
                email: organization.email,
                wallet_address: organization.wallet_address,
                status: data.fullDocument.status,
                created_at: data.fullDocument.created
            }
            socket.emit("sendPending", resData);
        }

    });
});

const mainRouter = require('./routes/main.routes');

app.use('/api/admin/', mainRouter);

module.exports = app;

/*
{
  _id: {
    _data: '8263DF8648000000022B022C0100296E5A10049BF97FEDD65D4F9789DA7B2ECCDE1C8846645F6964006463DF8648C817953F69BEF1910004'
  },
  operationType: 'insert',
  clusterTime: new Timestamp({ t: 1675593288, i: 2 }),
  wallTime: 2023-02-05T10:34:48.869Z,
  fullDocument: {
    _id: new ObjectId("63df8648c817953f69bef191"),
    organization_id: new ObjectId("63df638b4db71be18f43b872"),
    status: 'pending',
    created: 2023-02-05T10:34:48.865Z,
    updated_at: 2023-02-05T10:34:48.867Z,
    __v: 0
  },
  ns: { db: 'certasnft', coll: 'status' },
  documentKey: { _id: new ObjectId("63df8648c817953f69bef191") }
}
*/
