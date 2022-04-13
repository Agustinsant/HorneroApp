const {Schema, model}= require("mongoose");


const AdminReport = new Schema({
    calendarEvents: {

    }

})

const AdminReportModel = model("AdminKeys", AdminReport);

module.exports = {AdminReportModel};