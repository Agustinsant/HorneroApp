const { FloorModel, DeskModel, CalendarModel } = require('../models/buildings')

module.exports.addDesk = async (req, res, next) => {

    const { idFloor } = req.params
    const { positionX, positionY, rotation, type } = req.body

    const option ={
        returnDocument : "after"
    }

    try {
        const floor = await FloorModel.findById(idFloor) 
        const newDesk = await DeskModel({ type, positionX, positionY, rotation,  floorId: floor._id, buildingId: floor.buildingId }).save()

        floor.desks.push(newDesk)

        const updateFloor = await FloorModel.findByIdAndUpdate(idFloor, floor, option)
        return res.status(201).send(updateFloor)
    }
    catch (error) {
        next (error)
    }

}

module.exports.getDeskById = async (req, res, next) => { 
    const { id } = req.params

    try {
        const desk = await DeskModel.findById(id)
        return res.status(200).send(desk)
    }
    catch (error){
        next (error)
    }
}

module.exports.getAllDesks = async (req, res, next) => { 

    try {
        const desk = await DeskModel.find({})
        return res.status(200).send(desk)
    }
    catch (error){
        next (error)
    }
}

module.exports.updateDeskById = async (req, res, next) => { 
    const { id } = req.params
    
    const option ={
        returnDocument : "after"
    }

    try {
        const beforeUpdate = await DeskModel.findById(id)

        const updateDesk = await DeskModel.findByIdAndUpdate(id, req.body, option)
        
        const floorByDesk = await FloorModel.findById(updateDesk.floorId)

        const positionNewDesk = floorByDesk.desks.indexOf(beforeUpdate)

        const desklessFloor = floorByDesk.desks.filter(desk => desk._id.toHexString() !== updateDesk._id.toHexString()  )
        
        desklessFloor.splice(positionNewDesk,0,updateDesk)

        floorByDesk.desks = desklessFloor

        await FloorModel.findByIdAndUpdate(floorByDesk._id, floorByDesk)

        return res.status(202).send(updateDesk)
    }
    catch (error){
        next (error)
    }
}


module.exports.deleteDeskById = async (req, res, next) => { 
    const { id } = req.params

    try {
        const deleteDesk = await DeskModel.findByIdAndRemove(id)

        const floorByDesk = await FloorModel.findById(deleteDesk.floorId)
        
        const newDesks = floorByDesk.desks.filter(desk => desk._id.toHexString() !== deleteDesk._id.toHexString() )
        
        floorByDesk.desks = newDesks

        await FloorModel.findByIdAndUpdate(floorByDesk._id, floorByDesk)

        await CalendarModel.deleteMany({deskId: id})
        
        return res.status(200).send(deleteDesk)
    }
    catch (error){
        next (error)
    }
}