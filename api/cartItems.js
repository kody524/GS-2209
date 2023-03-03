const express = require("express");
const router = express.Router();

router.get('/:cartId',async(req,res,next)=>{
    const {cartId}=req.params;
    try{
const getCartItems = await getCartItemsByCartId(cartId)
res.send(getCartItems)
    }catch({name,message}){
        next({name,message})
    }
})


module.exports = router