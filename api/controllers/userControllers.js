const { UserModel } = require("../models/users");
const bcrypt = require("bcrypt");
const { randomName } = require("../utils/helpers");
const path = require("path");
const jwt = require("jsonwebtoken");
const uploadFile = require("../utils/s3");
require("dotenv").config();

const fs = require("fs");
const util = require("util");
const sendEmailBy = require("../utils/sendEmailBy");

const unlinkFile = util.promisify(fs.unlink);

module.exports.Register = async (req, res, next) => {
  const { name, city, email, password } = req.body;

  try {
    const user = await UserModel({
      name: name.replace(/\b\w/g, (l) => l.toUpperCase()),
      city,
      email,
      password,
    }).save();
    return res.status(201).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports.Login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //FIND USER
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).send({ error: "Usuario no encontrado" });

    //MATCH PASSWORD
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send({ error: "contraseña no válida" });

    //CREATE TOKEN
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      process.env.TOKEN_SECRET
    );

    res.header("auth-token", token).json({
      error: null,
      data: { token },
    });
  } catch (error) {
    next(error);
  }
};

module.exports.GetUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};


module.exports.GetUserByEmail = async (req, res, next) => {
  const { email } = req.params;
  console.log("email ===>", email);
  try {
    const user = await UserModel.findOne({ email: email });
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};


module.exports.GetAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

module.exports.GetAllFriends = async (req, res, next) => {
  const { userId } = req.params;
  const friends = [];
  try {
    const user = await UserModel.findById(userId);
    for (const el of user.friends){
      const friend = await UserModel.findById(el);
      friends.push(friend);
    }
   
    res.status(200).send(friends);
  } catch (error) {
    next(error);
  }
};

module.exports.UpdateUser = async (req, res, next) => {

  const { id } = req.params;
  const { name, city, email } = req.body
  const validName = /^([a-zA-Z]+[',.-]?[a-zA-Z ]*)+[ ]([a-zA-Z]+[',.-]?[a-zA-Z ]+)+$/
  const validCity = /^.{2,26}$/
  const validEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i

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

    if(name || name === '') if(!validName.test(name)) return next()
    if(email || email === '') if(!validEmail.test(email)) return next()
    if(city || city === '') if(!validCity.test(city)) return next()
    
    const user = await UserModel.findByIdAndUpdate(id, req.body, options);
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserPassword = async (req, res, next) => {

  const { id } = req.params
  const { password } = req.body
  const validation = /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,14}$/
  const options = {
    returnDocument: "after",
  }
  
  try {
    if(!validation.test(password)) return next()

    const user = await UserModel.findById(id)

    if(user) sendEmailBy('editPassByClient', user.email, password)

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    user.password = hash
    user.salt = salt

    const passwordUpdate = await UserModel.findByIdAndUpdate( id, user, options)
    return res.status(200).send(passwordUpdate)
    
  } catch (error) {
    next(error);
  }

} 


module.exports.DeleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userDelete = await UserModel.findOneAndRemove(id);
    return res.status(200).send(userDelete);
  } catch (error) {
    next(error);
  }
};

module.exports.Me = async (req, res, next) => {
  if (!req.user) return res.status(404).send("User not Found");
  try {
    const user = await UserModel.findById(req.user._id);
    return res.status(200).send(user);
  } catch (error) {

    next(error)
  }
}

