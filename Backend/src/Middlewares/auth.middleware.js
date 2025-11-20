const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");

async function userMiddleware(req, res, next) {
    const token = req.cookies.token;
  
    if(!token) {
        return res.status(400).send("token not found - please login first")
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if(decode.type !="user"){
        return res.status(400).send("denied access..only user can access")
    }

    const user = await userModel.findById(decode._id);
    if(!user) {
        return res.status(400).send("User not found");
    }
    req.user = user;
    next();

}
module.exports = userMiddleware;