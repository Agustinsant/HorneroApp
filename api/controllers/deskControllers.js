const { FloorModel, DeskModel } = require('../models/buildings')

module.exports.addDesk = async (req, res, next) => {

    const { idFloor } = req.params
    const { positionX, positionY, rotation, imgDesk } = req.body

    const option ={
        returnDocument : "after"
    }

    try {
        const newDesk = await DeskModel({ positionX, positionY, rotation, imgDesk }).save()
        const floor = await FloorModel.findById(idFloor) 

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
        const updateDesk = await DeskModel.findByIdAndUpdate(id, req.body, option)
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
        return res.status(200).send(deleteDesk)
    }
    catch (error){
        next (error)
    }
}