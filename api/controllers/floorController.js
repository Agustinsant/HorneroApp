const { FloorModel, BuildingModel } = require('../models/buildings')

module.exports.addFloor = async (req, res, next) => {
    const { idBuilding } = req.params
    const { name, imgFloor } = req.body
    const options = {
        returnDocument: "after"
    }
    try {
        const newFloor = await FloorModel({ name, imgFloor }).save()
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

    try {
        const deleteFloor = await FloorModel.findByIdAndRemove(id)
        return res.status(200).send(deleteFloor)
    }
    catch (error) {
        next(error)
    }

} 



