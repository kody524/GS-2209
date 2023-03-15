/* eslint-disable jsx-a11y/alt-text */
import React, {useState,useEffect} from "react";
import { getAllCars, getSingleCar } from "../allApiCalls";
import {Card, Grid, Typography, Button, CardContent, Dialog, Modal} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from "./NavBar";
import SingleCarModal from "./SingleCarModal";
export function Cars({cars, setCars,loginSuccess}){
useEffect(() => {
   
    getAllCars(setCars)
    },[]);


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
<NavBar loginSuccess={loginSuccess}></NavBar>
<h1>Cars</h1>
<h2>Search</h2>
<input
    type = "text"
    placeholder='search cars'
    value = {searchQuery}
    onChange = {(event) => {updateSearchQuery(event.target.value)}}
/>
<Grid>
{cars.map((car) => {
    return (<>
        <NavBar loginSuccess={loginSuccess}/>
        <Grid item xs={12} sm={6} md={4} lg={3} key={cars.vehicle_id}>
            <Card>
                <CardContent>
                   
                    <Typography variant="h5">{car.make}</Typography>
                    <Typography variant="h6">{car.model}</Typography>
                    <Typography variant="h6">{car.price}</Typography>
                    <Typography variant="body1">{car.description}</Typography>
                    {/* <Button variant="contained" onClick={<SingleCarModal carId={cars.id}/>}>Vehicle Single View</Button> */}
                </CardContent>
            </Card>
        </Grid>
   </> );
})}
</Grid></>)
}
export default Cars;