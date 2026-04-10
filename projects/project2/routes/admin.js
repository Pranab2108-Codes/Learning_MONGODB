const { Router } = require("express");
const adminMiddleWare = require("../middleWare/admin");
const { Admin,Course } = require("../database/index.js");
const router = Router();
const jwt = require("jsonwebtoken");
const jwtSecret = require("../mainCode/index.js");


// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
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
    // Implement course creation logic
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.find({
        username,
        password
    });
    if(user){
        const token = jwt.sign({username},jwtSecret);
        res.json({
            token
        });
    }else{
        res.status(411).json({
            message: "Incorrect email and password"
        })
    }


});

router.get('/courses', adminMiddleWare, async (req, res) => {
    // Implement fetching all courses logic
    const allCourses = await Course.find({});
    
    res.json({
        courses: allCourses
    });

});

module.exports = router;