const express = require('express');
const jwt = require('jsonwebtoken')

const {authenticatejwt,SECRET} = require('../Middlewares/auth.js')
const {Admin,Course} = require('../db/index.js')

const router = express.Router();

//route for admin to get his all courses
router.get('/mycourses',authenticatejwt,async(req,res)=>{
    const username = req.user.username;
    const admin = await Admin.findOne({username});
    if(!admin){
        res.status(403).json({msg: "Admin doesnt exist"})
        return
    }
    // res.json(admin.coursesCreated);
    const courses = await Course.find({author:admin._id});
    res.json(courses);

})



//a route to create a new course

router.post('/createcourse', authenticatejwt, async (req, res) => {
    const { title, description, image, price, isPublished } = req.body;

    // Check for missing fields
    if (!title || !description || !image || !price || isPublished === undefined) {
        return res.status(400).json({ msg: "Please enter all the fields" });
    }

    try {
        const username = req.user.username;
        const admin = await Admin.findOne({ username });

        // Check if admin is found
        if (!admin) {
            return res.status(404).json({ msg: "Admin not found" });
        }

        const newCourse = new Course({
            title,
            description,
            image,
            price,
            author: admin._id,
            isPublished
        });

        await newCourse.save();

        admin.coursesCreated.push(newCourse._id);
        admin.noOfCoursesCreated++;
        await admin.save();

        res.json({ msg: "Course created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
});




//route to edit a course
router.put('/course/:id',authenticatejwt,async(req,res)=>{
    const id = req.params.id;
    const {title,description,image,price,isPublished} = req.body;
    if(!title || !description || !image || !price || isPublished === undefined){
        res.status(403).json({msg:"Please enter all the fields"})
        return
    }
    const course = await Course.findById(id);
    course.title = title;
    course.description = description;
    course.image = image;
    course.price = price;
    course.isPublished = isPublished;
    
    await course.save();
    res.json({msg:"Course updated successfully"})
})

//route to delete a course
router.delete('/course/:id', authenticatejwt, async (req, res) => {
    const id = req.params.id;
    
    try {
      // Find the course by ID to get the admin's ID
      const course = await Course.findById(id);
      
      if (!course) {
        return res.status(404).json({ msg: "Course not found" });
      }
  
      // Delete the course from the Course model
      await Course.findByIdAndDelete(id);
  
      // Update the admin's createdCourses field
      await Admin.updateOne(
        { _id: course.adminId },
        { $pull: { createdCourses: id } }
      );
  
      res.json({ msg: "Course deleted successfully" });
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({ msg: "Server error" });
    }
  });
  

//route to update admin only 
router.put('/admin/:username', authenticatejwt, async (req, res) => {
    const username1 = req.params.username;
  
    try {
      const admin = await Admin.findOne({ username: username1 });
  
      if (!admin) {
        return res.status(404).json({ msg: "Admin not found" });
      }
  
      const { username, password, image } = req.body;
  
      if (username) admin.username = username;
      if (password) admin.password = password;
      if (image) admin.image = image;
  
      await admin.save();
  
      res.json({ msg: "Admin details updated successfully" });
    } catch (error) {
      console.error('Error updating admin details:', error);
      res.status(500).json({ msg: "Server error" });
    }
  });
  

  

router.get('/admin/:username',authenticatejwt,async(req,res)=>{
    const username = req.params.username;
    const admin = await Admin.findOne({username});
    res.json(admin)

})

module.exports = router;