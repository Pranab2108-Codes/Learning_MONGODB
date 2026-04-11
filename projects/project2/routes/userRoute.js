const { Router } = require("express");
const router = Router();
const userMiddleWare = require("../middleWare/userMiddleWare.js");
const { User,Course } = require("../database/database.js");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../config.js");


router.post('/signup', async (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    await User.create({

        username,
        password
        
    });
    res.json({

        message: "User created successfully..."
        
    }); 

});

router.post('/signin', async (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({

        username,
        password

    });
    if(user){

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

router.get('/courses', async (req, res) => {
    
    const allCourse = await Course.find({});
    res.json({

        message: allCourse

    });

});

router.post('/courses/:id', userMiddleWare, async (req, res) => {
    
    const courseId = req.params.id;
    const username = req.username;
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

router.get('/purchasedCourses', userMiddleWare, async (req, res) => {
    
    const user = await User.findOne({

        username: req.username

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

module.exports = router;