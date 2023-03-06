const express = require("express");
const router = express.Router();
const{getAllCars,createCar,updateCars,getCarsById,deleteCars}=require('../db/cars')


//get all cars
router.get('/',async(req,res,next)=>{
    try{
const allCars = await getAllCars()
res.send(allCars)
    }catch({name,message}){
next({name,message})
    }
})
// add to cars table
router.post('/',async(req,res,next)=>{
    const {make,model,year,price,inventory,condition,engine,transmission,drivetrain,fuel,exteriorcolor,interiorcolor,description}=req.body;
    try{
const create = await createCar({make,model,year,price,inventory,condition,engine,transmission,drivetrain,fuel,exteriorcolor,interiorcolor,description})
if(create){
    res.send({message:"Car Created",create})
}else{
    res.send({
        name:"ErrorCreatingCar",
        message:"Error creating car"
    })
}

    }catch({name,message}){
        next({name,message})
    }
})
// get a single car by id
router.get('/:carId',async(req,res,next)=>{
    const {carId}=req.params;
    try{
       const getCar = await getCarsById(carId)
      if(getCar){
        res.send(getCar)
      }else{
        res.send({
            name:"NoCarFound",
            message:"No car found with that ID"
        })
      }
    }catch({name,message}){
        next({name,message})
    }
})
//edit car by id
router.patch('/:carId',async(req,res,next)=>{
    const { carId }=req.params;
    const {make,model,year,price,inventory,condition,engine,transmission,drivetrain,fuel,exteriorcolor,interiorcolor,description}=req.body;
    console.log(req.body)
    try{
    const originalCar = await getCarsById(carId);
    if(!originalCar){
        res.send({
            name:"NoCarFound",
            message:"No car found with that ID"
        })
    }else{
        const updatedCar = await updateCars(carId,req.body)
        res.send({message:"updated car successful",updatedCar})
    }
}catch({name,message}){
    next({name,message})
}
})
//delete car by id
router.delete('/:carId',async(req,res,next)=>{
    const {carId}=req.params;
    const originalCar = await getCarsById(carId)
        try{
if(!originalCar){
    res.send({
        name:"NoCarFound",
        message:"No car found with that ID"
    })
}else{
    const deleteCar = await deleteCars(carId);
    res.send({
        message:"Car deleted",
        car:deleteCar
    })
}
    }catch({name,message}){
        next({name,message})
    }
})



module.exports = router;