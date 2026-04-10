const jwt = require("jsonwebtoken");
const secret = require("../mainCode/index.js")

function userMiddleWare(req,res,next){

    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, secret);
    if(decodedValue.username){
        next();
    }else{
        res.status(403).json({
            message: "You are not authenticated"
        });
    }
    
}

module.exports = userMiddleWare;