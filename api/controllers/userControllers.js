const { UserModel } = require("../models/users");
const bcrypt = require("bcrypt");
const { randomName } = require("../utils/helpers");
const sendGmail = require("../utils/mailer")
const path = require("path");
const jwt = require("jsonwebtoken");
const uploadFile = require("../utils/s3");
require("dotenv").config();

const fs = require("fs");
const util = require("util");

const unlinkFile = util.promisify(fs.unlink);

module.exports.Register = async (req, res, next) => {

  const { name, city, email, password } = req.body

  try {
    const user = await UserModel({
      name: name.replace(/\b\w/g, (l) => l.toUpperCase()),
      city,
      email,
      password,
    }).save()
    return res.status(201).send(user)

  } catch (error) {
    next(error)
  }
}

module.exports.Login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    //FIND USER
    const user = await UserModel.findOne({ email })
    if (!user) return res.status(400).send({ error: "Usuario no encontrado" })

    //MATCH PASSWORD
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword)
      return res.status(400).send({ error: "contraseña no válida" })

    //CREATE TOKEN
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      process.env.TOKEN_SECRET
    )

    res.header("auth-token", token).json({
      error: null,
      data: { token },
    })
  } catch (error) {
    next(error)
  }
}

module.exports.GetUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const user = await UserModel.findById(id)
    return res.status(200).send(user)
  } catch (error) {
    next(error)
  }
}

module.exports.GetAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({})
    return res.status(200).send(users)
  } catch (error) {
    next(error)
  }
}

module.exports.UpdateUser = async (req, res, next) => {
  const { id } = req.params;

  
  const options = {
    returnDocument: "after",
  };
  if (req.file) {
    const file = req.file;
    const result = await uploadFile(file);

    try {
      await unlinkFile(file.path);
      const user = await UserModel.findByIdAndUpdate(
        id,
        { img: result.Location },
        options
      );
      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }

  try {
    const user = await UserModel.findByIdAndUpdate(id, req.body, options);
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserPassword = async (req, res, next) => {

  const { id } = req.params
  const { password } = req.body
  const options = {
    returnDocument: "after",
  }

  try {

    const user = await UserModel.findById(id)

    sendGmail(user.email, password, 'updateByClient')

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    user.password = hash
    user.salt = salt

    const passwordUpdate = await UserModel.findByIdAndUpdate( id, user, options)
    return res.status(200).send(passwordUpdate)
    
  } catch (error) {
    next(error)
  }
} 

module.exports.DeleteUser = async (req, res, next) => {
  const { id } = req.params
  try {
    const userDelete = await UserModel.findOneAndRemove(id)
    return res.status(200).send(userDelete)
  } catch (error) {
    next(error)
  }
}

module.exports.Me = async (req, res, next) => {
  if (!req.user) return res.status(404).send("User not Found")
  try {
    const user = await UserModel.findById(req.user._id)
    return res.status(200).send(user)
  } catch (error) {
    next(error)
  }
}