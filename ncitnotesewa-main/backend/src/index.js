import http from "http";
import express from 'express';
import createError from 'http-errors';
import cors from 'cors';
import path from "path";
import connectDB from './config/connection.js';
import router from "./routes/web.js";
import DbSeeder from "./seeder/DbSeeder.js";

import Message from "./models/Message.js";

import {Server} from "socket.io";

import dotenv from "dotenv";

dotenv.config();


const __dirname = path.resolve();


const app = express()

let server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST']
    }
});


// set public folder
app.use(express.static('public'));


// express body parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/**
 * =================Connect to database process================
 */
connectDB().then((res) => {
    console.log(res.message);
}).catch((err) => {
    console.log(err.message);
});


// db seeder

new DbSeeder().run();


/**
 * ==================Connect to database process end=============
 */


/**
 * ==================Route Register here==========================
 */
app.use("/", router);

/**
 * ==================Route Register end here==========================
 */


io.on('connection', (socket) => {
    socket.on('message', async (msg) => {
        let sender = msg.sender;
        let receiver = msg.receiver;
        let message = msg.message.trim();
        await Message.create({message: message, sender: sender, receiver: receiver});
        io.emit('message', msg);
    });
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    let message = {
        message: err.message, error: err
    }

    res.json(message);
});

let port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Server is running on port http://127.0.0.1:${port}`);
});

