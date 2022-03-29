const express = require('express')
const floorRouter = express.Router()
const { addFloor, getFloorByID, getAllFloor, UpdateFloorById, DeleteFloorById } = require('../controllers/floorController')

floorRouter.post('/add/:idBuilding', addFloor) // registra un piso

floorRouter.get('/:id', getFloorByID) // trae un piso

floorRouter.get('/', getAllFloor) // trae todos los pisos

floorRouter.put('/update/:id', UpdateFloorById) // edita un piso

floorRouter.delete('/delete/:id', DeleteFloorById) // elimina un piso

module.exports = floorRouter