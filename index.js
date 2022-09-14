import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import upload from 'express-fileupload';
import authenticationRoute from './routes/authentication.js';
import roleRoute from './routes/role.js';
import userRoute from './routes/user.js';
import bartenderRoute from './routes/userTypes/bartender.js';
import followRoute from './routes/follow.js';
import ratingRoute from './routes/rating.js';
import channelRoute from './routes/channel.js';
import categoryRoute from './routes/category.js';
import subscriptioRoute from './routes/subscription.js';
import videoRoute from './routes/video.js';
import HomeRoute from './routes/home.js';

dotenv.config();
var PORT = process.env.PORT,
DB_URL = process.env.DB_URL;

console.clear();
mongoose.connect(DB_URL, (err,db) =>{
    if (err) console.error(err);
    console.log("DB Connected Successfully");
})

const app = express();

app.use(express.json());
app.use(upload());
app.use(cors());
app.use(express.urlencoded({extended:false}))
app.use(express.static('public'));


app.get("/", (req, res) => res.send("Welcome to the Users API!"));

// register 






// All Routes are registered Here

app.use("/api/auth", authenticationRoute);
app.use("/api/role", roleRoute);
app.use("/api/user", userRoute);
app.use("/api/bartender", bartenderRoute);
app.use('/api/follow',followRoute);
app.use('/api/rating',ratingRoute);
app.use('/api/channel',channelRoute);
app.use('/api/category',categoryRoute);
app.use('/api/subscription',subscriptioRoute);
app.use('/api/video',videoRoute);
app.use('/api/home',HomeRoute);


const expressServer = app.listen(PORT, () => {
    console.log(`\x1b[92mServer is now up and running on ${PORT}`);
});

