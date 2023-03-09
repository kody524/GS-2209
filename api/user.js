const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const {createUser,getUserByEmail,getUserById,getUserByUsername,updateUsersInfo, deleteAccount}=require('../db/users')
const{getRatingsByUser}=require('../db/ratings')


router.post('/register',async(req,res,next)=>{
    const { username, password,email,firstname,lastname,street,city,state,zip,phone}=req.body;
    console.log("1",firstname,"2",lastname)
    try{
const _user = await getUserByUsername(username)
const _user1 = await getUserByEmail(email)
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
                error:`Username ${_user.username} already exists`,
                message:"Username is already taken",
                name:"UserAlreadyExistsError"
            })
        }
        if(_user1){
            res.send({
                error:`User already exists with that email`,
                message:"Email is used by another account",
                name:"EmailAlreadyExistsError"
            })
        }
        const user =  await createUser(req.body)

        const token = jwt.sign({id:user.id,username,},"luxury")
        res.send({message:"Thanks for signing up!",id:user.id,username:user.username,token})
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
    const getUser = await getUserById(verified.id)
    const getRatings = await getRatingsByUser(verified.id)
    console.log(getUser)
    res.send({getUser,getRatings})
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
router.patch('/me',async(req,res,next)=>{
    try{
        if(req.headers.authorization){
            const usertoken = req.headers.authorization
            const split = usertoken.split(' ');
            const token = split[1];
            const verified = jwt.verify(token,"luxury")
            const updateInfo = await updateUsersInfo(verified.id,req.body)
            res.send({message:"Info updated",updateInfo})
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
            const deletedAccount = await deleteAccount(verified.id)
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