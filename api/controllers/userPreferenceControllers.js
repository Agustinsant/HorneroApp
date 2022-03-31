const { UserModel } = require("../models/users");



module.exports.AddBuilding = async (req, res, next) => {

    const {userId} = req.params
    const {buildingId} = req.body 

    const options = {
      returnDocument: "after",
    };
  
    try {
      
      const user = await UserModel.findById(userId)
      user.preferencesBuildings.push(buildingId)
      
      const updateUser = await UserModel.findByIdAndUpdate(userId, user, options)
      
      return res.status(200).send(updateUser)
    } 
    
    catch (error) {
      next (error)
    }
  
  }

  module.exports.DeleteBuilding= async (req, res, next) => {
  
    const {userId} = req.params
  
    const {buildingId} = req.body
    
    const options = {
      returnDocument: "after",
    };
  
    try {
      
      const user = await UserModel.findById(userId)

      const newBuildings = user.preferencesBuildings.filter( (id) =>  id !== buildingId)
      user.preferencesBuildings = newBuildings
      
      const updateUser = await UserModel.findByIdAndUpdate(userId, user, options)
  
      return res.status(200).send(updateUser)
  
    } 
    
    catch (error) {
      next (error)
    }
  
  }


  module.exports.addFloor = async (req, res, next) => {

    const {userId} = req.params
    
    const {floorId} = req.body 

    const options = {
      returnDocument: "after",
    };
  
    try {
      
      const user = await UserModel.findById(userId)
      user.preferencesFloors.push(floorId)
      
      const updateUser = await UserModel.findByIdAndUpdate(userId, user, options)
      
      return res.status(200).send(updateUser)
    } 
    
    catch (error) {
      next (error)
    }
  }


  module.exports.DeleteFloor= async (req, res, next) => {
  
    const {userId} = req.params
  
    const {floorId} = req.body
    
    const options = {
      returnDocument: "after",
    };
  
    try {
      
      const user = await UserModel.findById(userId)

      const newFloors = user.preferencesFloors.filter( (id) =>  id !== floorId)
      user.preferencesFloors = newFloors
      
      const updateUser = await UserModel.findByIdAndUpdate(userId, user, options)
  
      return res.status(200).send(updateUser)
  
    } 
    
    catch (error) {
      next (error)
    }
  
  }

  module.exports.addDesk = async (req, res, next) => {

    const {userId} = req.params
    
    const {deskId} = req.body 

    const options = {
      returnDocument: "after",
    };
  
    try {
      
      const user = await UserModel.findById(userId)
      user.preferencesDesks.push(deskId)
      
      const updateUser = await UserModel.findByIdAndUpdate(userId, user, options)
      
      return res.status(200).send(updateUser)
    } 
    
    catch (error) {
      next (error)
    }
   
  }
  

  module.exports.DeleteDesk= async (req, res, next) => {
  
    const {userId} = req.params
  
    const {deskId} = req.body
    
    const options = {
      returnDocument: "after",
    };
  
    try {
      
      const user = await UserModel.findById(userId)

      const newDesks = user.preferencesDesks.filter( (id) =>  id !== deskId)
      user.preferencesDesks = newDesks
      
      const updateUser = await UserModel.findByIdAndUpdate(userId, user, options)
  
      return res.status(200).send(updateUser)
  
    } 
    
    catch (error) {
      next (error)
    }
  
  }