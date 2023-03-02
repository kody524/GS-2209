const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");


router.post('/register',async(req,res,next)=>{
    const { username, password,email,firstname,lastname,street,city,state,zip,phone}=req.body;
    try{
const _user = await getUserByUsername(username);
if(!username || !password){
    next({
        name:"MissingRequiredInfoError",
        message:"Please fill in the username and password",
    })
}
if(password.length<8){
    res.send({
        name:"PasswordTooShortError",
        message:"Password needs to be longer than 8 characters",
    })
}
        if(_user){
            res.send({
                error:`Username ${_user} already exists`,
                message:"Username is already taken",
                name:"UserAlreadyExistsError"
            })
        }
        const user = await createUser({ username, password,email,firstname,lastname,street,city,state,zip,phone})

        const token = jwt.sign({id:user.id,username,},"luxury")
        res.send({message:"Thanks for registering",token,user})
    }catch({name,message}){
       next({name,message})
    }
})
router.post('/login',async(req,res,next)=>{
    const { username, password }=req.body;
    const message = "you're logged in!";
    //needs username and password 
    if(!username || !password ){
        next({
            name:"MissingCredentilasError",
            message:"Please supply both username and password"
        })
    }
    try{
        const user =  await getUserByUsername(username)
        if(user&&user.password===password){
            const token = jwt.sign({
                id:user.id,
                username:user.username
            },"luxury");
            res.send({user,message,token});
        }else{
            next({
                name:"IncorrectCredentialsError",
                message:"Username or Password is incorrect"
            })
        }
    }catch({name,message}){
        next({name,message})
    }
})

router.get('/me',async(req,res,next)=>{
    try{
if(req.headers.authorization){
    const usertoken = req.headers.authorization
    const split = usertoken.split(' ');
    const token = split[1];
    const verified = jwt.verify(token,"luxury")
    res.send({
        id:verified.id,username:verified.username
    })
}else{
    res.status(401)
    res.send({
        error:"UnauthorizedError",name:"401",message:"You're not authorized for access"
    })
}
    }catch({name,message}){
        next({name,message})
    }
})
router.delete('/me',async(req,res,next)=>{
    const {username,password}=req.body;
    try{
        if(req.headers.authorization){
            const usertoken = req.headers.authorization
            const split = usertoken.split(' ');
            const token = split[1];
            const verified = jwt.verify(token,"luxury")
           if(username===verified.username&&password===verified.password){
            const deleteAccount = await deleteUserAccountByUserId(verified.id)
            res.send({
                message:"Account deleted"
            })
           }else{
res.send({
    name:"Verification Error",
    message:"Cannot verify User"
})
           }
        }else{
            res.status(401)
            res.send({
                error:"UnauthorizedError",name:"401",message:"You're not authorized for access"
            })
        }
    }catch({name,message}){
        next({name,message})
    }
})



module.exports = router;