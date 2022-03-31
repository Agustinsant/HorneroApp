const nodemailer = require("nodemailer");

const sendGmail = (email, newFullOrder, productsInvolve) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: true,
    auth: {
      user: "CUENTA DE HORNEROAPP, crearla para despachar mails",
      pass: "PASSWORD QUE DA GOOGLE PARA DESPACHAR MAILS desde API",
    },
  });

  const mailOptions = {
    from: `Hornero App`,
    to: `${email}`,
    subject: `Confirmacion de compra Nª ${newFullOrder.id}`,
    html: `<h3>El estado de su compra es: ${newFullOrder.state}</h3>
    <h3>La dirección de envío: ${newFullOrder.address}</h3>
    <h3>Método de pago elegido : ${newFullOrder.payment}</h3>
    <h3>El total de su compra es $${newFullOrder.total}</h3>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.status(200).send(mailOptions);
    }
  });
};

module.exports = sendGmail;
// 1) esquematizar logica del mialsender en las rutas y su consumo desde el back
// 2) agregar argumentos necesarios para el contenido del mail en cuerpo de mailOptions
// 3) crear cuenta google mail y configurar para que de password para uso en APIs
// 4) llenar de mail a todo el mundo
