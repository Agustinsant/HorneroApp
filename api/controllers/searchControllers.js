const { UserModel } = require('../models/users')

module.exports.getForNameOrEmail = async (req, res, next) => {

    const { value } = req.body

    const limit = parseInt(req.query.limit, 10) || 9

    const page = parseInt(req.query.page, 10) || 1
    
    const validateToMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    try {
        if (validateToMail.test(value)) {

            const user = await UserModel.paginate({ email: value })

            return res.status(200).send(user)

        }

        else {
            
            const user = await UserModel.paginate({ name: { $regex: value.replace(/\b\w/g, l => l.toUpperCase()) }},{ limit, page })

            return res.status(200).send(user)
        }
    }
    catch (error) {
        next(error)
    }
}