const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { userRouter } = require("./routes/userRoutes.routes.js");
require("dotenv").config()

const app = express();

app.use(express.json());
app.use(cors())

app.use("/user",userRouter)


app.listen(8080,async()=>{
    try {
        await connection
        console.log("DB is connected")
    } catch (error) {
        
    }
    console.log("Server is running ")
})