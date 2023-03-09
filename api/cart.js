const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const{getUserById}=require('../db/users')
const{getCartsByUser,deleteCart,updateCart}=require('../db/cart');




router.get('/:userId',async(req,res,next)=>{
    const {userId}=req.params;
    const getUser = await getUserById(userId)
   try{
    if(getUser.id){
        const getCart = await getCartsByUser(userId)
        console.log(getCart)
        if(getCart){
            res.send(getCart)
        }else{
            res.send({name:"NoCartFound",message:"no cart found for that user"})
        }
    }else{
        res.send({
            name:"NoUserFound",
            message:"No user exists with that id"
        })
    }
   }catch({name,message}){
    next({name,message})
   }
})
router.patch('/:userId',async(req,res,next)=>{
    const{userId}=req.params;
    try{
        if(req.headers.authorization){
            const usertoken = req.headers.authorization;
            const token = usertoken.split(' ');
            const decoded = jwt.verify(token[1], "luxury")
            if(decoded.id===userId){
                const getCartId = await getCartsByUser(userId)
                const update = await updateCart(getCartId.id,req.body)
                res.send({message:"cart updated",update})
            }
            }else{
                res.send({
                    name:"NotAuthorized",
                    message:"you cannot delete carts that are not yours"
                })
            }
    }catch({name,message}){
        next({name,message})
    }
})

router.delete('/:userId',async(req,res,next)=>{
    const{userId}=req.params;
    const getCart = await getCartsByUser(userId);
    try{
        if(req.headers.authorization){
            const usertoken = req.headers.authorization;
            const token = usertoken.split(' ');
            const decoded = jwt.verify(token[1], "luxury");
            const username= decoded.username
            const decodedId = decoded.id
            if(userId===decodedId){
                const deletedCart = await deleteCart(getCartsByUser.id)
                res.send({
                    message:"deleted cart",deletedCart
                })
            }else{
                res.send({
                    name:"NotAuthorized",
                    message:"you cannot delete carts that are not yours"
                })
            }

            }else{
               res.send({
                name:"WrongToken",
                message:"Cannot verify user"
               })
            }
    }catch({name,message}){
        next({name,message})
    }
})




module.exports = router;