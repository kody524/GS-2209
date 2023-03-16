const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const{getUserById}=require('../db/users')
const{addItemsToCart}=require('../db/carttItems')
const{getCartsByUser,deleteCart,updateCart, createCart}=require('../db/cart');
const { ElevatorSharp } = require("@mui/icons-material");




router.get('/:userId',async(req,res,next)=>{
    const {userId}=req.params;
   try{
const user  = await getUserById(userId)
if(user===undefined){
    res.send({message:"no user exists"})
}else{
    const cart = await getCartsByUser(userId)
    if(cart===undefined){
        res.send({message:"no cart exists"})
    }else{
        res.send(cart)
    }
}
   }catch(error){
    console.log(error)
   }
})

router.post('/',async(req,res,next)=>{
    const{user_id,transactioncomplete,vehicle_id,quantity}=req.body

    const checkForCart = await getCartsByUser(user_id)
console.log('1',checkForCart)
    try{
if(checkForCart===undefined){
    console.log('hi')
    const createInitialCart = await createCart({user_id,transactioncomplete})
    console.log(createInitialCart)
    const cart_id = createInitialCart.id
  
    const addToCart = await addItemsToCart({cart_id,vehicle_id,quantity})
    res.send({addToCart,message:"item added"})
}else{
    console.log('hi1')
   const cart_id = checkForCart.id
   
const add = await addItemsToCart({cart_id,vehicle_id,quantity})

res.send({add,message:"item added "})
}

    }catch(error){
        console.log(error)
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