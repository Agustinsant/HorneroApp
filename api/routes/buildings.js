const express = require('express')
const buildingRouter = express.Router()
const { AddBuilding, getBuildingById, getAllBuilding, updateBuildingById, deleteBuildingById } = require('../controllers/buildingControllers')

buildingRouter.post('/add', AddBuilding) // registra un edificio

buildingRouter.get('/:id', getBuildingById) // trae edificio por id

buildingRouter.get('/', getAllBuilding) // trae todos los edificio

buildingRouter.put('/update/:id', updateBuildingById) // edita un edificio

buildingRouter.delete('/delete/:id', deleteBuildingById) // elimina un edificio

module.exports = buildingRouter