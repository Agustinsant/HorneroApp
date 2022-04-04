const sendGmail = require('../utils/mailer')

module.exports.ForgotPassword = async (req, res, next) => {

    const { gmail } = req.params

    try {
        sendGmail(gmail, )
        return res.send('send')
    }
    catch (error) {
        next(error)
    }

} 