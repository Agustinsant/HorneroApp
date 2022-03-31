const { BuildingModel, FloorModel, DeskModel, CalendarModel } = require('../models/buildings')

module.exports.AddBuilding = async (req, res, next) => {

    const { name, address, city } = req.body

    try {
        const newBuilding = await BuildingModel({ name, address, city }).save()
        return res.status(201).send(newBuilding)
    }
    catch (error) {
        next(error)
    }

}

module.exports.getBuildingById = async (req, res, next) => {
    
    const { id } = req.params

    try {
        const building = await BuildingModel.findById(id)
        return res.status(200).send(building)
    }
    catch (error) {
        next(error)
    }

}

module.exports.getAllBuilding = async (req, res, next) => {

    try {
        const buildings = await BuildingModel.find({})
        return res.status(200).send(buildings)
    }
    catch (error) {
        next(error)
    }

}  

module.exports.updateBuildingById = async (req, res, next) => {

    const { id } = req.params
    const options = {
        returnDocument: "after"
    }

    try {
        const updateBuilding = await BuildingModel.findByIdAndUpdate(id, req.body, options)
        return res.status(200).send(updateBuilding)
    }
    catch (error) {
        next(error)
    }

}  

module.exports.deleteBuildingById = async (req, res, next) => {

    const { id } = req.params

    try {
        const deleteBuilding = await BuildingModel.findByIdAndRemove(id)
        await FloorModel.deleteMany({buildingId: id})
        await DeskModel.deleteMany({buildingId: id})
        await CalendarModel.deleteMany({buildingId: id})
        
        return res.status(200).send(deleteBuilding)
    }
    catch (error) {
        next(error)
    }

}