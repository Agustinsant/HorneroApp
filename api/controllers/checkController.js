const { UserModel } = require("../models/users")

module.exports.NotificationCheck = async (req, res, next) => {
    const { id, type } = req.body
    console.log('id===>', id)

    const options = {
        returnDocument: 'after'
    }

    try {
        const user = await UserModel.findById(id)
    console.log('user===>', user)


        if(type === 'emailMyReserve') {
            user.emailMyReserve = !user.emailMyReserve
        }
        else if(type === 'emailFriendsReserve') {
            user.emailFriendsReserve = !user.emailFriendsReserve
        }
        else if(type === 'emailGroupReserve') {
            user.emailGroupReserve = !user.emailGroupReserve
        }
        const updateUser = await UserModel.findByIdAndUpdate(id, user, options)
        return res.status(200).send(updateUser)

    } catch (error) {
        next(error)
    }
}