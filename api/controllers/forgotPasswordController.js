const { UserModel } = require("../models/users")
const sendGmail = require("../utils/mailer")
const bcrypt = require('bcrypt')

module.exports.ForgotPassword = async (req, res, next) => {

  const { email } = req.params
  const options = {
    returnDocument: "after",
  }

  try {

    const user = await UserModel.findOne({ email })

    if(!user) return

    const idUser = user._id.toHexString()
    const newPassword = `NewPass${Math.floor(Math.random()*9000+1000)}`

    sendGmail(email, newPassword)

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)
    user.password = hash
    user.salt = salt

    const userUpdate = await UserModel.findByIdAndUpdate( idUser, user, options)
    return res.status(200).send(userUpdate)
    
  } catch (error) {
    next(error)
  }
} 