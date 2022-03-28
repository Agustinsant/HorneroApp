const express = require("express")
const deskRouter = express.Router()
const { addDesk, getDeskById, getAllDesks, updateDeskById, deleteDeskById } = require('../controllers/deskControllers') 

deskRouter.post('/add/:idFloor', addDesk) // Registra un escritorio

deskRouter.get('/:id', getDeskById) // trae un escritorio

deskRouter.get('/', getAllDesks) // trae todos escritorios

deskRouter.put('/update/:id', updateDeskById) // edita un escritorio

deskRouter.delete('/delete/:id', deleteDeskById) // elimina un escritorio



module.exports = deskRouter
