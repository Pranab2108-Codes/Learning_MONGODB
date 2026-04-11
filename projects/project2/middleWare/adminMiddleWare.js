const jwt = require("jsonwebtoken");
const jwtSecret = require("../config.js");                                                 /* Here we are importing the secret key. */


function adminMiddleWare(req,res,next){

    const token = req.headers.authorization;
    const words = token.split(" ");
    const jwtToken = words[1];                                                             /* The 0th index would be bearer and 1st index would be that signature. */
    try{

        const decodedValue = jwt.verify(jwtToken, jwtSecret);
        if(decodedValue.username){

            req.username = decodedValue.username;
            next();

        }else{

            res.status(403).json({

                message: "You are not authenticated as admin!!!"

            });

        }
        
    }
    catch(error){

        res.status(501).json({
            
            message: "Incorrect inputs!!!"

        });

    }
    
}

module.exports = adminMiddleWare;