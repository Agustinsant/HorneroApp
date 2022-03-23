const express = require('express')
const userRouter = express.Router()
const { Register, Login, GetAllUsers, DeleteUser }= require('../controllers/userControllers')


userRouter.post('/register', Register) //Registro de usuario

userRouter.post('/login', Login) //logueo de usuario

userRouter.get('/allUsers', GetAllUsers) // traer todos los usuarios

userRouter.delete('/deleteUser/:id', DeleteUser) // elimina un usuario

module.exports = userRouter



