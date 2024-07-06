const jwt = require('jsonwebtoken');
const SECRET = 'se3r3t';

//the function of this middleware is to check if the admin or user is logged in and has token otherwise send error to login

function authenticatejwt(req,res,next){

    const authHeader = req.headers.authorization;

    if(authHeader){
        const token = authHeader.split(' ')[1];
        if(token){
        jwt.verify(token,SECRET,(err,user)=>{
            if(err){
                return res.sendStatus(403);
            }
            else{
                req.user = user;
                
                next();
            }
        });
    }

    }
    else{
        return res.sendStatus(401);
        }
    
}

module.exports={
    authenticatejwt,SECRET
}