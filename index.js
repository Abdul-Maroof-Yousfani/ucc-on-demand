import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import jwt from 'jsonwebtoken';
import upload from 'express-fileupload';
import authenticationRoute from './routes/authentication.js';

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
app.use(express.static('public'));


app.get("/", (req, res) => res.send("Welcome to the Users API!"));

// All Routes are registered Here

app.use("/api/auth", authenticationRoute);


const expressServer = app.listen(PORT, () => {
    console.log(`\x1b[92mServer is now up and running on ${PORT}`);
});

