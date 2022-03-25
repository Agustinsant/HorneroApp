const express = require("express");
const routes = require('./routes')
const cors = require('cors');


require("dotenv").config();
require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes)



app.get("/",(req,res)=>{
    res.send("Server Up!")
})

app.listen(process.env.SERVER_PORT, () => {
    console.log("Server on port", process.env.SERVER_PORT)
})