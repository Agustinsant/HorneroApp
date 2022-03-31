const { UserModel } = require('../models/users')

module.exports.getForNameOrEmail = async (req, res, next) => {

    const { value } = req.body

    const validateToMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    try {
        if (validateToMail.test(value)) {

            const user = await UserModel.findOne({ email: value })

            return res.status(200).send(user)

        }

        else {

            const user = await UserModel.find({ name: { $regex: value }})

            return res.status(200).send(user)
        }
    }
    catch (error) {
        next(error)
    }
}