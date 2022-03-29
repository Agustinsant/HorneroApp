const express = require('express')
const multer = require('multer')
const userRouter = express.Router()
const { Register, Login, GetAllUsers, DeleteUser, Me, UpdateUser, GetUser, EditImage}= require('../controllers/userControllers')
const verifyToken = require("./validate-token");

const upload = multer()


userRouter.post('/register', Register) //Registro de usuario

userRouter.post('/login', Login) //logueo de usuario

userRouter.get('/me', verifyToken,  Me)

userRouter.get('/allUsers', GetAllUsers) // traer todos los usuarios

userRouter.get('/:id', GetUser) // traer un usuario

userRouter.post('/updateUser/:id', upload.single('image'), UpdateUser) // editar un usuario

userRouter.delete('/deleteUser/:id', DeleteUser) // elimina un usuario

userRouter.post('/profile_image', EditImage)

module.exports = userRouter