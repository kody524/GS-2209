const express = require("express");
const router = express.Router()

router.get('/',async(req,res,next)=>{
    res.send("test success")
})




module.exports = router;