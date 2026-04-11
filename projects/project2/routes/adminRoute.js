const { Router } = require("express");
const adminMiddleWare = require("../middleWare/adminMiddleWare.js");
const { Admin,Course, } = require("../database/database.js");
const router = Router();
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config.js");

 
router.post('/signup', async (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    await Admin.create({

        username,
        password

    });
    res.json({

        message: "Admin created successfully"
    
    });

});

router.post('/signin', async (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    const admin = await Admin.find({

        username,
        password

    });
    if(admin){

        const token = jwt.sign({username}, jwtSecret);
        res.json({

            token

        });

    }else{

        res.status(411).json({

            message: "Incorrect email and password"
        
        });

    }

});

router.post('/courses', adminMiddleWare, async (req, res) => {                                            /* Here it means admin/courses. */

    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;                                                                 /* If we could use the zod validation here then it can be more affectable. */
    const price = req.body.price;
    const newCourse = await Course.create({

        title,
        description,
        imageLink,
        price

    });
    console.log(newCourse);
    res.json({

        message: "Course created successfully...", 
        courseId: newCourse._id                                                                           /* Here _id is the default key which is created by MongoDB, this Id will always be unique. */

    });

});

router.get('/courses', adminMiddleWare, async (req, res) => {
    
    const allCourses = await Course.find({});
    res.json({

        courses: allCourses
        
    });

});

module.exports = router;