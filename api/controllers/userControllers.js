const { UserModel } = require('../models/users')



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

    const { email } = req.body
    try {
        const user = await UserModel.findOne({ email })
        return res.status(200).send(user)
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

