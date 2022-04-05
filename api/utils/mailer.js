const nodemailer = require("nodemailer")

const sendGmail = (email, newPassword, updateBy) => {
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
    subject: `Nueva contraseña`,
    html: `<h3>Su nueva contraseña es: <strong>${newPassword}</strong></h3>
    ${ !updateBy ? '<h3>Le recomedamos cambiar la contraseña en Mi perfil / Mis datos personales</h3>' : ''}`,
  }

  // http://localhost:3000/

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message)
    } else {
      res.status(200).send(mailOptions)
    }
  })
}

module.exports = sendGmail
// 1) esquematizar logica del mialsender en las rutas y su consumo desde el back
// 2) agregar argumentos necesarios para el contenido del mail en cuerpo de mailOptions
// 3) crear cuenta google mail y configurar para que de password para uso en APIs
// 4) llenar de mail a todo el mundo
