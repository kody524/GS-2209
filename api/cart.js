const express = require("express");
const router = express.Router();


router.get('/:userId',async(req,res,next)=>{
    const {userId}=req.params;
    const getUser = await getUserById(userId)
   try{
    if(getUser){
        const getCart = await getCartByUserId(userId)
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
router.delete('/:userId',async(req,res,next)=>{
    const{userId}=req.params;
    const getCart = await getCartByUserId(userId);
    try{
        if(req.headers.authorization){
            const usertoken = req.headers.authorization;
            const token = usertoken.split(' ');
            const decoded = jwt.verify(token[1], "luxury");
            const username= decoded.username
            const decodedId = decoded.id
            if(userId===decodedId){
                const deleteCart = await deleteCartByUserId(userId)
                res.send({
                    message:"deleted cart",deleteCart
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