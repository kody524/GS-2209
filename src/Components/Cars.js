import React, {useState,useEffect} from "react";
import { getAllCars } from "../allApiCalls";
import styles from './Cars.module.css'
import NavBar from './NavBar';



export function Cars(){
    const [cars,setCars]=useState([])
console.log(cars)
useEffect(()=>{
getAllCars(setCars)
},[])
return(
<>
<NavBar />
{
    cars.map(ele=>{
        return(
            <div className={styles.container}>
        <div className={styles.box}>
            <p>make:{ele.make}</p>
            <p>model:{ele.model}</p>
            <p>year:{ele.year}</p>
            <p>price:{ele.price}</p>
            <p>inventory:{ele.inventory}</p>
            <p>condition:{ele.condition}</p>
            <p>engine:{ele.engine}</p>
            </div>
            </div>
        )
    })
}
</>
)

}