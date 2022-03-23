
const UsersModel = require('inserte su modelo aqui')



module.exports.Register = async (req, res, next) => {

    try {
        const user = await UsersModel(req.body).save()
        return res.status(201).send(user)
    }
    catch (error) {
        next(error)
    }
}

module.exports.Login = async (req, res, next) => {

    const { email } = req.body
    try {
        const user = await UsersModel.findOne({ email })
        return res.status(200).send(user)
    }
    catch (error) {
        next(error)
    }
}

module.exports.GetAllUsers = async (req, res, next) => {

    try {
        const users = await UsersModel.find({})
        return res.status(200).send(users)
    }
    catch (error) {
        next(error)
    }
}

module.exports.DeleteUser = async (req, res, next) => {
    
    const {id} = req.params
    try {
        const userDelete = await UsersModel.findOneAndRemove(id)
        return res.status(200).send(userDelete)
    }
    catch (error) {
        next(error)
    }
} 

