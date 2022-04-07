const { BuildingModel, FloorModel } = require("../models/buildings")
const { UserModel } = require("../models/users")
const sendGmail = require("./mailer")

const sendEmailBy = async (sendingType, data, moreInfo) => {

  if (sendingType === "addEvent") {

    const { start, end, buildingId, floorId, userId } = data

    try {
      const build = await BuildingModel.findById(buildingId)
      const floor = await FloorModel.findById(floorId)
      const user = await UserModel.findById(userId)
      const subject = "Reserva confirmada"
      const text = `<h3>Reserva confirmada en ${build.name}, ${floor.name}, en la fecha/hora: ${start}</h3>`

      if(user) sendGmail(user.email, subject, text)
    } catch (error) {
      return
    }
  } 
  
  else if (sendingType === "forgotPassword") {

    const email = data
    const newPassword = moreInfo
    const subject = "Nueva contraseña"
    const text = `<h3>Tu nueva contraseña es: <strong>${newPassword}</strong>, no olvides cambiarla cuanto antes en Mi perfil/ Mis datos</h3>`

    sendGmail(email, subject, text)

  }

  else if (sendingType === "editPassByClient") {

    const email = data
    const newPassword = moreInfo
    const subject = "Nueva contraseña"
    const text = `<h3>Recuerda, tu nueva contraseña es: <strong>${newPassword}</strong></h3>`

    sendGmail(email, subject, text)

  }
}

module.exports = sendEmailBy
