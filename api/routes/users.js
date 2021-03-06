const express = require('express')
const multer = require('multer')
const userRouter = express.Router()


const { Register, Login, GetAllUsers, DeleteUser, Me, UpdateUser, GetUser, GetUserByEmail, updateUserPassword, GetAllFriends }= require('../controllers/userControllers')


const { AddFriend, DeleteFriend } = require('../controllers/userFriendControllers')
const { AddBuilding, addFloor, addDesk, DeleteBuilding, DeleteFloor, DeleteDesk } = require('../controllers/userPreferenceControllers')

const verifyToken = require("../middleware/validate-token");

const upload = multer()

userRouter.post('/register', Register) //Registro de usuario

userRouter.post('/login', Login) //logueo de usuario

userRouter.get('/me', verifyToken,  Me)

userRouter.get('/allUsers', GetAllUsers) // traer todos los usuarios

userRouter.get('/:userId/allFriends', GetAllFriends) // traer todos los amigos de un usuario

userRouter.get('/:id', GetUser) // traer un usuario

userRouter.post('/updateUser/:id', upload.single('image'), UpdateUser) // editar un usuario

userRouter.post('/updateUserPassword/:id', updateUserPassword) // editar password de usuario

userRouter.delete('/deleteUser/:id', DeleteUser) // elimina un usuario

userRouter.post('/:userId/addFriend', AddFriend ) // agrega amigo a favoritos

userRouter.delete('/:userId/deletefriend', DeleteFriend) // elimina amigo de favoritos

userRouter.post('/:userId/preferences/addBuilding', AddBuilding) // agrega edificio a favoritos

userRouter.delete('/:userId/preferences/deleteBuilding', DeleteBuilding) //elimina edificio de favoritos

userRouter.post('/:userId/preferences/addFloor', addFloor) // agrega piso a favoritos

userRouter.delete('/:userId/preferences/deleteFloor', DeleteFloor) // elimina piso de favoritos

userRouter.post('/:userId/preferences/addDesk', addDesk) // agrega escritorios a favoritos

userRouter.delete('/:userId/preferences/deleteDesk', DeleteDesk) // elimina escritorio de favoritos




module.exports = userRouter
