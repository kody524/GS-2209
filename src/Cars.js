import React, {useState,useEffect} from "react";
import { getAllCars } from "./allApiCalls";

export function Cars(){
    const [cars,setCars]=useState([])

useEffect(()=>{
getAllCars(setCars)
},[])
return(
    cars.map((ele,idx)=>{
        <p>{ele}</p>
    })
)

}