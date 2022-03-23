const express = require("express");
require("dotenv").config();
require("./db");

const app = express();

app.get("/",(req,res)=>{
    res.send("Server Up!")
})

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server on port", process.env.SERVER_PORT)
})