const express = require('express');
const router = express.Router();

router.get('/test',async(req,res,next)=>{
    res.send({message:"test successful"})
    next();
})

//Router:users
const usersRouter = require('./user')
router.use('/users',usersRouter)

//Router:cars
const carsRouter = require('./cars')
router.use('/cars',carsRouter)

//Router:cart
const cartRouter = require('./cart')
router.use('/cart',cartRouter)

//Router:ratings
const ratingsRouter = require('./ratings')
router.use('/ratings',ratingsRouter)

module.exports = 
    router
