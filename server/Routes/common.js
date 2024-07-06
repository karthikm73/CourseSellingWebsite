const express = require('express');
const jwt = require('jsonwebtoken')

const {authenticatejwt,SECRET} = require('../Middlewares/auth.js')
const {Admin,Course,User} = require('../db/index.js')

const router = express.Router();

//this route is for getting username and role
router.get('/me',authenticatejwt,async(req,res)=>{
    const username = req.user.username;
    const role = req.user.role;

    const admin = await Admin.findOne({username});
    if(!admin){
        res.status(403).json({msg: "Admin doesnt exist"})
        return
    }
    else{
        res.json({
            username: admin.username,
            role:role

        })

    }
    
    
})

//common route for signing up
//
router.post('/signup',async(req,res)=>{
    const {username,password,role} = req.body;
    if(!username || !password){
        res.status(403).json({msg:"Please enter all the fields"})
        return
    }   
    if(role !== 'admin'){
        const user = await User.findOne({username});
        if(user){
            res.status(403).json({msg:"User already exists"})
            return
        }
        const newUser = new User({
            username,
            password
        })
        await newUser.save();
        
        const token = jwt.sign({ username, role }, SECRET);
        res.json({ message: 'User created successfully', token });
        return
    }
    if(role === 'admin'){
        const admin = await Admin.findOne({username});
    if(admin){
        res.status(403).json({msg:"Admin already exists"})
        return
    }
    const newAdmin = new Admin({
        username,
        password
    })
    await newAdmin.save();
    
    const token = jwt.sign({ username, role }, SECRET);
    res.json({ message: 'Admin created successfully', token });
        
    }
    
})


router.post('/signin',async(req,res)=>{
    const {username,password,role} = req.body;
    if(!username || !password){
        res.status(403).json({msg:"Please enter all the fields"})
        return
    }
    if(role !== 'admin'){
        const user = await User.findOne({username});
        if(!user){
            res.status(403).json({msg:"User doesnt exist"})
            return
        }
        if(user.password !== password){
            res.status(403).json({msg:"Incorrect password"})
            return
        }
        const token = jwt.sign({ username, role: 'user' }, SECRET);
        res.json({ message: 'User logged in successfully', token });
        return
    }
    if(role === 'admin'){
        const admin = await Admin.findOne({username});
    if(!admin){
        res.status(403).json({msg:"Admin doesnt exist"})
        return
    }
    if(admin.password !== password){
        res.status(403).json({msg:"Incorrect password"})
        return
    }
    const token = jwt.sign({ username, role: 'admin' }, SECRET);
    res.json({ message: 'Admin logged in successfully', token });

    }
    
})


//route to get all courses present in the course database
router.get('/allcourses',async(req,res)=>{
    const courses = await Course.find().populate('author', 'name'); // Populate the author field with the name    
    res.json(courses)
})

//route to get all authors
router.get('/author',async(req,res)=>{
    const author = await Admin.find();
    res.json(author);
})

router.get('/course/:id',authenticatejwt,async(req,res)=>{
    const {id} = req.params;
    const course = await Course.findById(id);
    res.json(course)


})


module.exports = router