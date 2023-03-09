const express = require("express");
const { getRatingsByUser, getRatingsByCar,getRatingById } = require("../db/ratings");
const{getUserById}=require('../db/users')
const jwt = require("jsonwebtoken");
const router = express.Router()

router.get('/user/:userId',async(req,res,next)=>{
    const{userId}=req.params;
    const user = await getUserById(userId)
    try{
        if(req.headers.authorization){
            const usertoken = req.headers.authorization
            const split = usertoken.split(' ');
            const token = split[1];
            const verified = jwt.verify(token,"luxury")
            if(verified.username===user.username){
                const getRatings = await getRatingsByUser(userId)
                res.send(getRatings)
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
router.get('/car/:carId',async(req,res,next)=>{
    const {carId}=req.params
    try{
const getRatings = await getRatingsByCar(carId)
res.send(getRatings)
    }catch({name,message}){
        next({name,message})
    }
})
router.delete('/:ratingId',async(req,res,next)=>{
    const{ratingId}=req.params;
     const getOriginalRating = await getRatingById(ratingId)
    try{
  if(req.headers.authorization){
            const usertoken = req.headers.authorization
            const split = usertoken.split(' ');
            const token = split[1];
            const verified = jwt.verify(token,"luxury")
            if(verified.id===getOriginalRating.userid){
                const deleteRating = await deleteRating(ratingId)
                res.send({
                    message:"rating deleted",
                    deletedRating:deleteRating
                })
            }else{
                res.send({
                    name:"WrongUser",
                    message:"cannot delete rating that isn't yours"
                })
            }
        }else{
            res.status(401)
            res.send({
                error:"UnauthorizedError",name:"401",message:"You're not authorized for access"
            })}


    }catch({name,message}){
        next({name,message})
    }
})



module.exports = router;