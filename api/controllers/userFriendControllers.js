const { UserModel } = require("../models/users");


module.exports.AddFriend = async (req, res, next) => {

    const {userId} = req.params
  
    const {friendId} = req.body
  
  
    const options = {
      returnDocument: "after",
    };
  
    try {
      
      const user = await UserModel.findById(userId)
      user.friends.push(friendId)
      const updateUser = await UserModel.findByIdAndUpdate(userId, user, options)
  
      return res.status(201).send(updateUser)
  
    } 
    
    catch (error) {
      next (error)
    }
  
  }
  
  
  module.exports.DeleteFriend = async (req, res, next) => {
  
    const {userId} = req.params
  
    const {friendId} = req.body
    const options = {
      returnDocument: "after",
    };
  
    try {
      
      const user = await UserModel.findById(userId)
      const newFriends = user.friends.filter( (id) =>  id !== friendId)
      user.friends = newFriends
      const updateUser = await UserModel.findByIdAndUpdate(userId, user, options)
  
      return res.status(200).send(updateUser)
  
    } 
    
    catch (error) {
      next (error)
    }
  
  }