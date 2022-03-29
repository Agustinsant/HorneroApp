const { UserModel } = require("../models/users");
const bcrypt = require("bcrypt");
const { randomName } = require("../utils/helpers");
const path = require("path");
const fs = require("fs-extra");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.Register = async (req, res, next) => {
  try {
    const user = await UserModel(req.body).save();
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
        name: user.name
       
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

module.exports.GetAllUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

module.exports.UpdateUser = async (req, res, next) => {
  const { id } = req.params;

  console.log(req.file)
  const options = {
    returnDocument: "after",
  };
  if (req.file) {
    const imgUrl = randomName();
    const imgTemPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLocaleLowerCase();
    const targetPath = path.resolve(`src/storage/upload/${imgUrl}${ext}`);
    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif")
      await fs.rename(imgTemPath, targetPath);
      try {
        const user = await UserModel.findByIdAndUpdate(id, {img: imgUrl + ext}, options);
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
    next(error);
  }
  
};

module.exports.EditImage = async (req, res, next) => {
  const imgUrl = randomName();
  const imgTemPath = req.file.path;
  const ext = path.extname(req.file.originalname).toLocaleLowerCase();
  const targetPath = path.resolve(`public/upload/${imgUrl}${ext}`);
  if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif")
    await fs.rename(imgTemPath, targetPath);
  console.log(req.file);
  res.send("Listo");
};
