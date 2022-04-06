const nodemailer = require("nodemailer")

const sendGmail = (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: true,
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`,
    },
  })
  
  const mailOptions = {
    from: `Hornero App`,
    to: `${email}`,
    subject: subject,
    html: text,
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message)
    } else {
      res.status(200).send(mailOptions)
    }
  })
}

module.exports = sendGmail