const mongoose = require('mongoose');                                                        /* Importing the mongoose library for MongoDB. */
mongoose.connect('mongodb+srv://cluster_username:cluster_password@cluster0.bfysxu8.mongodb.net/');
                                                                                             /* Connect to MongoDB, here admin is the username and after the(:) Pranab@100 is the password for this cluster which was make while creation. */

const AdminSchema = new mongoose.Schema({                                                    /* Defining the schema/structure for the Admin, means only in which way the data need to be put. */
        
    username: String,
    password: String

});

const UserSchema = new mongoose.Schema({                                                     /* Defining the schema/structure for the User, means only in which way the data need to be put. */
    
    username: String,
    password: String,
    purchasedCourses: [{

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'

    }]

});

const CourseSchema = new mongoose.Schema({                                                   /* Defining the schema/structure for the Course, means only in which way the data need to be put. */
    
    title: String,
    description: String,
    imageLink: String,
    price: Number

});

const Admin = mongoose.model('Admin', AdminSchema);                                          /* Here we are pointing the table Admin should follow the schema of AdminSchema, similarly for User and Course it will follow schema of UserSchema and CourseSchema respectively. */                          
const User = mongoose.model('User', UserSchema);                                             /* As we know these Admin, User and Course are the tables, but in fact these are only the models through which we can access the tables in MongoDB, and in MongoDB these models will be in small alphabetic word with get pluralize. */
const Course = mongoose.model('Course', CourseSchema);                                       /* So in final the tables will become like admins, users and courses. */

module.exports = { Admin,User,Course };                                                      /* Here we are exporting these tables because then only we can access these tables outside of this folder(database) also. */      