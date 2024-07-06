const express = require('express');
const jwt = require('jsonwebtoken')

const {authenticatejwt,SECRET} = require('../Middlewares/auth.js')
const {User,Course} = require('../db/index.js')

const router = express.Router();


router.get('/mycourses', authenticatejwt, async (req, res) => {
    try {
        const username = req.user.username;
        const user = await User.findOne({ username }).populate('purchasedCourses');

        if (!user) {
            return res.status(403).json({ msg: "User doesn't exist" });
        }

        res.json({
            courses: user.purchasedCourses
        });
    } catch (error) {
        console.error('Error fetching user courses:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
});


router.put('/purchase/:id',authenticatejwt,async(req,res)=>{
    const username = req.user.username;
    const {id} = req.params;
    const user = await User.findOne({username});
    if(!user){
        res.status(403).json({msg: "User doesnt exist"})
        return
    }
    else{
        const course = await Course.findById(id);
        user.purchasedCourses.push(course._id);
        await user.save();
        res.json({msg:"Course purchased successfully"})
    }
})

module.exports = router