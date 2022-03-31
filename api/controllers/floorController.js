const { openSync } = require('fs-extra')
const { FloorModel, BuildingModel, DeskModel, CalendarModel } = require('../models/buildings')
const { DeleteFriend } = require('./userControllers')

module.exports.addFloor = async (req, res, next) => {
    const { idBuilding } = req.params
    const { name, imgFloor  } = req.body
    const options = {
        returnDocument: "after"
    }
    try {
        const newFloor = await FloorModel({ name, imgFloor, buildingId: idBuilding}).save()
        const building = await BuildingModel.findById(idBuilding)
        building.floors.push(newFloor)
        const updateBuilding = await BuildingModel.findByIdAndUpdate(idBuilding, building, options)
        return res.status(202).send(updateBuilding)
    }
    catch (error) {
        next(error)
    }
}

module.exports.getFloorByID = async (req, res, next) => {

    const { id } = req.params

    try {
        const floor = await FloorModel.findById(id)
        return res.status(200).send(floor)
    }
    catch (error) {
        next(error)
    }

}

module.exports.getAllFloor = async (req, res, next) => {
    
    try {
        const floor = await FloorModel.find({})
        return res.status(200).send(floor)
    }
    catch (error) {
        next(error)
    }

} 

module.exports.UpdateFloorById = async (req, res, next) => {
    
    const { id } = req.params
    const options = {
        returnDocument: "after"
    }

    try {
        const updateFloor = await FloorModel.findByIdAndUpdate(id, req.body, options)
        return res.status(202).send(updateFloor)
    }
    catch (error) {
        next(error)
    }

}  

module.exports.DeleteFloorById = async (req, res, next) => {
    
    const { id } = req.params

    const options = {
        returnDocument: "after"
    }

    try {
        const deleteFloor = await FloorModel.findByIdAndRemove(id)

        const buildingByFloor = await BuildingModel.findById(deleteFloor.buildingId)
        
        const newFloors = buildingByFloor.floors.filter(floor => floor._id.toHexString() !== deleteFloor._id.toHexString() )
        
        buildingByFloor.floors = newFloors

        await BuildingModel.findByIdAndUpdate(buildingByFloor._id, buildingByFloor, options)

        await DeskModel.deleteMany({floorId: id})
       
        await CalendarModel.deleteMany({floorId: id})

        return res.status(200).send(deleteFloor)
    }
    
    catch (error) {
        next(error)
    }

} 



