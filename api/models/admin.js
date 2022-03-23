const {Schema, model}= require("mongoose");


const AdminKeysSchema = new Schema({
    accessKeys:{
        type: [],
        default: []
    }
})

const AdminKeysModel = model("AdminKeys", AdminKeysSchema);

module.exports = {AdminKeysModel};