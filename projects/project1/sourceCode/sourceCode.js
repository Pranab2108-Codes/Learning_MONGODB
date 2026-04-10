const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("../routes/adminRoute");
const userRouter = require("../routes/userRoute");


app.use(bodyParser.json());
app.use("/admin", adminRouter);                                                  /* After get hit by /admin the control goes to adminRoute where the signup, creating a new course and view the courses all these availables. */
app.use("/user", userRouter);                                                    /* Similarly here also when get hit by /user all the control goes to the userRoute, where an user can view the courses, purchase it and do other things also. */
const PORT = 3000;

app.listen(PORT, () => {                                                         /* opening this application on port No. 3000. */

    console.log(`Server is running on port ${PORT}`);

});