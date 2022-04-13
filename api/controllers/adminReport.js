const { UserModel } = require('../models/users')
const { DeskModel, CalendarModel, BuildingModel, FloorModel } = require ('../models/buildings')
const { options } = require('../routes/adminReport')




module.exports.AddDayWeek = async (req, res, next) => {
    const {buildingId} = req.params
    const {dayId} = req.body

    const options = {
        returnDocument: "after",
      };

    try {
        const building = await BuildingModel.findById(buildingId)
        if(dayId) building.availableDays.push(dayId)
        const newBuilding = await BuildingModel.findByIdAndUpdate(buildingId, building,options)
       res.status(201).send(newBuilding)
    }
    catch (error) {
        next(error)
    }

}

module.exports.UpdateBusinessHours = async (req, res, next) => {
    const {buildingId} = req.params
    const {start , end } = req.body
    const hours = [start, end]

    const options = {
        returnDocument: "after",
      };


    try {
        const building = await BuildingModel.findByIdAndUpdate(buildingId, {businessHours: hours}, options)
       res.status(201).send(building)
    }
    catch (error) {
        next(error)
    }

}

module.exports.RemoveDayWeek = async (req, res, next) => {
    const {buildingId} = req.params
    const {dayId} = req.body
    let days = [];

    const options = {
        returnDocument: "after",
      };
    try {
        const building = await BuildingModel.findById(buildingId)
        days = building.availableDays.filter(day => parseInt(day) !== parseInt(dayId))
        const newBuilding =await BuildingModel.findByIdAndUpdate(buildingId, {availableDays: days}, options)
        
       res.status(201).send(newBuilding)
    }
    catch (error) {
        next(error)
    }

}





module.exports.YearReport = async (req, res, next) => {
    const {buildingId} = req.params
    const labels= ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octumbre','Noviembre','Diciembre']
    const data = [0,0,0,0,0,0,0,0,0,0,0,0]
    const label = "Resevas por Mes"
    const text = 'Reservas del Año'
    try {
        const allEvents = await CalendarModel.find({buildingId: buildingId})
        for (const event of allEvents){
            let start = event.start.split("T")[0] /// "2022-04-13  / 07:00:00"
            let date = new Date(`${start}T00:00:00`)
            let monthIndex = date.getMonth()
            data[monthIndex]++
        }

       res.status(200).send({data,labels, label,text})
    }
    catch (error) {
        next(error)
    }

}

module.exports.MonthReport = async (req, res, next) => {
    const {buildingId} = req.params
    const {year , month} = req.body

    const monthDays = month === 0 ? (new Date(year,month,0).getDate()) : (new Date(year,(month+1),0).getDate()) 
    const realMonth= (parseInt(month)+1).toString()
    const date = realMonth.length === 1 ? (`${year}-0${realMonth}`) : (`${year}-${realMonth}`)
    const validateDate = new RegExp("^((?!"+date+").)*$")

    const labels= []
    const data = []
    const label = "Resevas por Dia"
    const text = 'Reservas del Mes'
    

    for(let i=0; i<=monthDays; i++){
        labels[i]=i
        data[i]=0
    }
    try {
        const allEvents = await CalendarModel.find({buildingId: buildingId})
        const eventsMonth = allEvents.filter(event => validateDate.test(event.start) === false)
        for (const event of eventsMonth){
            let start = event.start.split("T")[0] /// "2022-04-13  / 07:00:00"
            let date = new Date(`${start}T00:00:00`)
            let monthIndex = date.getDate()
            data[monthIndex]++
        }

        res.status(200).send({data,labels, label,text})
    }
    catch (error) {
        next(error)
    }

}

module.exports.WeekReport = async (req, res, next) => {
    const {buildingId} = req.params
    const {year , month, week} = req.body

    const realMonth= (parseInt(month)+1).toString()
    const date = realMonth.length === 1 ? (`${year}-0${realMonth}`) : (`${year}-${realMonth}`)
    const validateDate = new RegExp("^((?!"+date+").)*$")


    const labels= ["Domingo", "Lunes","Martes", "Miercoles","Jueves","Viernes","Sabado"]
    const data = [0,0,0,0,0,0,0]
    const label = "Resevas por Dia"
    const text = 'Reservas de la Semana'
    const eventByWeek =  [[],[],[],[]]
    let i = week === "primera semana" ? (0) : (week === "segunda semana" ? (7) : (week === "tercera semana" ? (14) : (21)) )
    let max = week === "primera semana" ? (7) : (week === "segunda semana" ? (14) : (week === "tercera semana" ? (21) : (28)) )
    

    try {
        const allEvents = await CalendarModel.find({buildingId: buildingId})
        const eventsMonth = allEvents.filter(event => validateDate.test(event.start) === false)
        for (const event of eventsMonth){
            let start = event.start.split("T")[0] /// "2022-04-13  / 07:00:00"
            let num = parseInt(start.slice(8,start.length))
            if(num>=1 && num<=7) {
                eventByWeek[0].push(event)
            }
            if(num>7 && num<=14){
                eventByWeek[1].push(event)
            }
            if(num>14 && num<=21){
                eventByWeek[2].push(event)
            }
            if(num>21 && num<=28){
                eventByWeek[3].push(event)
            }
        }
        
        for (const event of eventByWeek[week]){
            let start = event.start.split("T")[0]
            let date = new Date(`${start}T00:00:00`)
            let dayIndex = date.getDate()
            data[dayIndex]++ // revisar esto
        }

        res.status(200).send({data,labels, label,text})
    }
    catch (error) {
        next(error)
    }

}