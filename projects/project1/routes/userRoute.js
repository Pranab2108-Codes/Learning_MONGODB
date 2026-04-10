const { Router } = require("express");
const router = Router();
const userMiddleWare = require("../middleWare/userMiddleWare.js");                                        /* Importing the userMiddleWare. */
const { User,Course } = require("../database/database.js");


router.post('/signup', (req, res) => {                                                                    /* Here it means /user/signup. */
    
    const username = req.body.username;
    const password = req.body.password;
    User.create({

        username,
        password

    });
    res.json({

        message: "User created successfully..."

    }); 

});

router.get('/courses', async (req, res) => {                                                              /* Here it means /user/courses. */
   
    const allCourse = await Course.find({});
    res.json({

        message: allCourse

    });

});

router.post('/courses/:id', userMiddleWare, async (req, res) => {                                        /* Here it means /user/courses/id(the actual id which was created while creating the courses by admin). */
    
    const courseId = req.params.id;
    const username = req.headers.username;
    await User.updateOne({

        username: username

    },{

        "$push": {

            purchasedCourses: courseId

        }

    });
    res.json({

        message: "Purchase complete..."

    });

});

router.get('/purchasedCourses', userMiddleWare, async (req, res) => {                                    /* It means /user/purchasedCourses. */
    
    const user = await User.findOne({

        username: req.headers.username

    });
    const courses = await Course.find({

        _id: {

            "$in": user.purchasedCourses

        }

    });
    res.json({

        courses: courses

    });

});

module.exports = router;                                                                                 /* Exporting this router so it can be use in sourceCode. */