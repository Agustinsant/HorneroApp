const {Schema, model}= require("mongoose");
const bcrypt = require("bcrypt");


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
    },
    city: {
        type: String,
        //required:true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    img: {
        type: String,
    }
})
//HASH PASSWORD
UserSchema.pre("save", async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(this.password, salt)
        this.password = hash
        this.salt = salt
        next()
    }
    catch(error){
        next(error)
    }
})

const UserModel = model("User", UserSchema);


module.exports = {UserModel};