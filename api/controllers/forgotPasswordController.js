const { UserModel } = require("../models/users")
const sendGmail = require("../utils/mailer")

module.exports.ForgotPassword = async (req, res, next) => {
  const { email } = req.params

  try {
    const dato = await UserModel.findOne({ email })
    if (dato) sendGmail(email)
    res.send("send")
  } catch (error) {
    next(error)
  }
}
