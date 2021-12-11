import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongodb, { MongoClient } from 'mongodb'

dotenv.config();
const app = express()

app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
    res.send("Hello world")
})

app.get("*", (req, res)=>{
    res.send("error 404")
})


app.listen("5000",()=>{
    console.log("server is running")
})
