const express = require("express");
const router = express.Router();
const {getCartItemsByCartId,updateCartItem, deleteCartItem}=require('../db/carttItems')

router.get('/:cartId',async(req,res,next)=>{
    const {cartId}=req.params;
    try{
const getCartItems = await getCartItemsByCartId(cartId)
res.send(getCartItems)
    }catch({name,message}){
        next({name,message})
    }
})
router.patch('/:cartId',async(req,res,next)=>{
    const {cartId}=req.params;
    const {quantity}=req.body;
try{
const getCart = await getCartItemsByCartId(cartId)
const update = await updateCartItem(getCart.id,quantity)
const getCartUpdated = await getCartItemsByCartId(cartId)
res.send({success:true,getCartUpdated})
}catch({name,message}){
    next({name,message})
}
})
router.delete('/:cartItemId',async(req,res,next)=>{
    const {cartItemId}=req.params;
    try{
const deleteItem = await deleteCartItem(cartItemId)
res.send({message:"Item deleted",deleteItem})
    }catch({name,message}){
        next({name,message})
    }
})


module.exports = router