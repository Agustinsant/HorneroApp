const {connect} = require("mongoose");
require("dotenv").config();

const {MONGO_URL} = process.env

const connection = async () => {
    try{
        const db = await connect(MONGO_URL)
        console.log("DB connected")
    }
    catch (error){
        console.error(error)
    }
};

connection();