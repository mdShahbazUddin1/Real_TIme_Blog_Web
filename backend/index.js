const express = require("express");
const { connection } = require("./config/db");
const cors = require("cors");
const { userRouter } = require("./routes/userRoutes.routes.js");
const session = require("express-session");
const { blogRoute } = require("./routes/blogRoute");
require("dotenv").config()

const app = express();
app.use(express.json({ limit: "50mb" }));
// app.use(express.json());
app.use(cors())

app.use(
  session({
    secret: process.env.sessionKey,
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/user",userRouter)
app.use("/blog",blogRoute)


app.listen(8080,async()=>{
    try {
        await connection
        console.log("DB is connected")
    } catch (error) {
        
    }
    console.log("Server is running ")
})