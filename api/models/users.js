const {Schema, model}= require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

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
    isAdmin:{
        type: Boolean,
        default: false
    },
    city: {
        type: String,
        //required:true,
    },
    friends:{
        type: [String]
    },
    preferencesBuildings:{
        type: [String]
    },
    preferencesFloors:{
        type: [String]
    },
    preferencesDesks:{
        type: [String]
    },
    img: {
        type: String,
        default: 'https://hornero-app.s3.amazonaws.com/no-user-image-icon-3.jpg'
    },
    emailMyReserve: {
        type: Boolean,
        default: true
    },
    emailFriendsReserve: {
        type: Boolean,
        default: true
    },
    emailGroupReserve: {
        type: Boolean,
        default: true
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


UserSchema.plugin(mongoosePaginate)
const UserModel = model("User", UserSchema);


module.exports = { UserModel };