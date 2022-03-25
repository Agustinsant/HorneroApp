const { UserModel } = require('../models/users')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports.Register = async (req, res, next) => {

    try {
        const user = await UserModel(req.body).save()
        return res.status(201).send(user)
    }
    catch (error) {
        next(error)
    }
}

module.exports.Login = async (req, res, next) => {

    const { email, password } = req.body
    try {
        //FIND USER
        const user = await UserModel.findOne({ email: email });
        if (!user) return res.status(400).send({ error: 'Usuario no encontrado' });
        
        //MATCH PASSWORD
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).send({ error: 'contraseña no válida' })
       
        //CREATE TOKEN 
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            email: user.email,
            city: user.city,
            isAdmin: user.isAdmin,
            img: user.img

        }, process.env.TOKEN_SECRET)

        res.header('auth-token', token).json({
            error: null,
            data: {token}
        })

    }
    catch (error) {
        next(error)
    }
}

module.exports.GetAllUsers = async (req, res, next) => {

    try {
        const users = await UserModel.find({})
        return res.status(200).send(users)
    }
    catch (error) {
        next(error)
    }
}

module.exports.DeleteUser = async (req, res, next) => {
    
    const {id} = req.params
    try {
        const userDelete = await UserModel.findOneAndRemove(id)
        return res.status(200).send(userDelete)
    }
    catch (error) {
        next(error)
    }
}

module.exports.Me = (req, res, next) => {
    if(!req.user)  return res.status(404).send("User not Found")
    res.send(req.user)
}
