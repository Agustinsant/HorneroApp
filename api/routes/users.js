const express = require('express')
const userRouter = express.Router()
const { Register, Login, GetAllUsers, DeleteUser, Me}= require('../controllers/userControllers')
const verifyToken = require("./validate-token");


userRouter.post('/register', Register) //Registro de usuario

userRouter.post('/login', Login) //logueo de usuario

userRouter.get('/me', verifyToken, Me)

userRouter.get('/allUsers', GetAllUsers) // traer todos los usuarios

userRouter.delete('/deleteUser/:id', DeleteUser) // elimina un usuario

module.exports = userRouter



