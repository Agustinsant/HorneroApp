const {Schema, model}= require("mongoose");


const AdminReport = new Schema({
    businessHours: { /// ["07:00","21:00"] [start, end]
        type: [String] 
    },
    availableDays: { /// [0,1,2,3,4,5] [dom, lun, mar , mi ,jue, vie]
        type: [Number]
    },
    calendarEvents: {

    }

})

const AdminReportModel = model("AdminKeys", AdminReport);

module.exports = {AdminReportModel};