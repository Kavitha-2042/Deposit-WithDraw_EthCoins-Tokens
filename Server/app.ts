import dotenv from "dotenv"
dotenv.config()

import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import accountRoute from "./Routes/accountRoute"
import withDrawRoute from './Routes/withDrawRoute';

const app:express.Application = express()

app.use(cors({
    credentials: true,
    origin: process.env.REACT_URL,
    methods: ["GET", "POST"]
}))

app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use("/account", accountRoute)
app.use("/withDraw", withDrawRoute)

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGOOSE_URL as string , (err)=>{
    console.log("Db Connected",err);
    app.listen(process.env.PORT as string, () =>{
        console.log(`Server runs on port ${process.env.PORT}`)
    })
})