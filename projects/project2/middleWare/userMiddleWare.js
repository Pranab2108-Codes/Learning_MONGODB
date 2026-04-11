const jwt = require("jsonwebtoken");
const  jwtSecret  = require("../config.js")


function userMiddleWare(req,res,next){

    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];                                                       /* The oth index is the word bearer which is define the type of token and the 1st index contain that string. */
    try{

        const decodedValue = jwt.verify(jwtToken, jwtSecret);
        if(decodedValue.username){

            req.username = decodedValue.username;
            next();

        }else{

            res.status(403).json({

                message: "You are not authenticated as user!!!"

            });

        }
        
    }
    catch(error){

        res.status(501).json({

            message: "Incorrect inputs!!!"

        });

    }
    
}

module.exports = userMiddleWare;