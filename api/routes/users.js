const express = require('express')
const userRouter = express.Router()
const { Register, Login, GetAllUsers, DeleteUser, Me}= require('../controllers/userControllers')
const verifyToken = require("./validate-token");


userRouter.post('/register', Register) //Registro de usuario

userRouter.post('/login', Login) //logueo de usuario

//userRouter.get("/logout", Logout) //deslogueo de usuario
userRouter.get('/verify', verifyToken, Me)

userRouter.get('/allUsers',verifyToken, GetAllUsers) // traer todos los usuarios

userRouter.delete('/deleteUser/:id',verifyToken, DeleteUser) // elimina un usuario

module.exports = userRouter



