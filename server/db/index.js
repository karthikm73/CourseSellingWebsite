const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AdminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    about: {
        type: String,
        default: ''
    },

    coursesCreated: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    noOfCoursesCreated: {
        type: Number,
        default: 0
    },
    publishedCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }],
    notPublishedCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

AdminSchema.pre('save', function(next) {
    this.noOfCoursesCreated = this.coursesCreated.length;
    next();
});

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    purchasedCourses: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    isPublished: {
        type: Boolean,
        default: false
    }
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports ={
    User,
    Admin,
    Course
}
