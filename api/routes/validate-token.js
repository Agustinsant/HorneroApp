const jwt = require('jsonwebtoken');
require("dotenv").config()

//middlerware validae token
const verifyToken = (req,res,next) => {
    const token = req.header("auth-token")
    if(!token) return res.status(401).send({error: "Access denied"})

    try{
        let verified = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
        next()
    } catch (error){
        res.status(400).send({error: "invalid token"})
    }


}

module.exports = verifyToken;