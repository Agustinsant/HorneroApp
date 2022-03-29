const express = require("express");
const multer = require('multer')
const path = require('path')

const routes = require('./routes')
const cors = require('cors');



require("dotenv").config();
require("./db");

const app = express();

// MIDDLEWARES

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer({dest: path.join(__dirname,'../src/storage/upload/temp')}).single('image'))

app.use('/api', routes)



app.get("/",(req,res)=>{
    res.send("Server Up!")
})

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server on port", process.env.SERVER_PORT)
})