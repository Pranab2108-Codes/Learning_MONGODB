const { Router } = require("express");                                                                    /* Here we are creating a router using express, we could have use app.get or app.post but when our application grows, it become messy so we split these routes in many files. */
const adminMiddleWare = require("../middleWare/adminMiddleWare.js");                                      /* Importing the adminMiddleWare. */                                   
const { Admin,Course } = require("../database/database.js");
const router = Router();


router.post('/signup', async (req, res) => {                                                              /* Here it means /admin/signup. */
    
    const username = req.body.username;
    const password = req.body.password;
    await Admin.create({                                                                                  /* What ever we are passing inside of body like username and password, it will be create now inside of database which can take time in database so that's why we are using this await. */

        username,
        password

    });
    res.json({

        message: "Admin created successfully..."                                                          /* When the admin signup then only a new database will get created named by test, which is a default database MongoDB automatically generate, if we put something else at the end of string which is for making connection with the cluster then it will create the database with that name only instead of test. */
    
    });

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

router.get('/courses', adminMiddleWare, async (req, res) => {                                             /* Here it means admin/courses. */
   
    const allCourses = await Course.find({});
    res.json({

        courses: allCourses

    });

});

module.exports = router;                                                                                  /* Exporting this router so it can be use in sourceCode. */