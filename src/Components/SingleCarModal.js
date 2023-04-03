import React, {useState,useEffect} from "react";
import { getAllCars } from "../allApiCalls";
import {Card, Grid, Typography, CardContent} from "@mui/material";
import NavBar from "./NavBar";
export function Cars({cars, setCars}){
useEffect(() => {
    getAllCars(setCars).then((cars) => {console.log(cars)
    });
}, []);
const [searchQuery, updateSearchQuery] = useState('')
let carsToDisplay = cars;
function carMatches(car, text) {
    const searchTerm = text.toLowerCase();
    const {
        make,
        model,
        year
    } = car;
    const toMatch = [make, model, year];
    for (const field of toMatch) {
        if (field.toString().toLowerCase().includes(searchTerm)) {
            return true
        }
    }
    return false
};
if(searchQuery.length > 0) {
    carsToDisplay = cars.filter((car) => carMatches(car, searchQuery))
} else {
    carsToDisplay = cars
}
return(
<>
<NavBar></NavBar>
<h1>Cars</h1>
<h2>Search</h2>
<input
    type = "text"
    placeholder='search cars'
    value = {searchQuery}
    onChange = {(event) => {updateSearchQuery(event.target.value)}}
/>
<Grid>
{cars.map((cars) => {
    return (<>
        <NavBar/>
        <Grid item xs={12} sm={6} md={4} lg={3} key={cars.vehicle_id}>
            <Card>
                <CardContent>
                    <img src={cars.image} alt={cars.description} style={{ maxWidth: '100%', height: 'auto' }}/>
                    <Typography variant="h5">{cars.make}</Typography>
                    <Typography variant="h6">{cars.model}</Typography>
                    <Typography variant="h6">{cars.price}</Typography>
                    <Typography variant="body1">{cars.description}</Typography>
                    {/* <Button variant="contained" onClick={<SingleCarModal carId={cars.id}/>}>Vehicle Single View</Button> */}
                </CardContent>
            </Card>
        </Grid>
   </> );
})}
</Grid></>)
}
export default Cars;