const { User } = require("../database/database.js");                                               /* Here we are importing the table of User which was created and exports in folder(database) database.js. */


function userMiddleWare(req,res,next){

    const username = req.headers.username;                                                         /* Here it checking the authorization if the user exist means they have signedup then only they can see the courses which they have purchased. */
    const password = req.headers.password;
    User.findOne({

        username: username,                                                                        /* Try to find out the matching username and password. */
        password: password 

    })
    .then(function(value){

        if(value){

            next();                                                                                /* If everythings are correct then only routes will get hit. */

        }else{

            res.status(403).json({

                message: "User doesn't exist!!!"                                                   /* Otherwise error get trigger. */

            });

        }
        
    });

}

module.exports = userMiddleWare;                                                                   /* Exporting the userMiddleWare so we can use into the routes. */