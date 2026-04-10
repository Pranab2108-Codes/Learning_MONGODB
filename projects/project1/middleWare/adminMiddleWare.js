const { Admin } = require("../database/database.js");                               /* In folder(database) database.js we have exports the Admin, User and Course. */


function adminMiddleWare(req,res,next){            

    const username = req.headers.username;                                          /* Authorization checked an admin can be only exist when they have signedup, then only he/she can view the courses and create new courses. */
    const password = req.headers.password;
    Admin.findOne({                                                                 /* findOne() is an operation in the mongoDB which takes time, and as we know javascript says i won't wait here i will give you a promise object and continue, not because in admin there is a document/row which represent in an object, in where all these fields(key:value) username, password lies. */                                     

        username: username,                                                         /* Try to find out with the matching username and password. */
        password: password 

    })
    .then(function(value){                                                          /* Here value is an object which we have got because of the promise. */

        if(value){

            next();                                                                 /* If everythings right then we will proceed further. */

        }else{

            res.status(403).json({

                message: "Admin doesn't exist!!!"                                   /* Otherwise we will get this error message. */

            });

        }

    });

}

module.exports = adminMiddleWare;                                                   /* Here we are exporting this middleWare because we need to use this in routes, so if the admin exist then only he/she can do his/her tasks. */