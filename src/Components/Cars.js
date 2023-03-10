import React, {useState,useEffect} from "react";
import { getAllCars } from "../allApiCalls";
import {Card, Grid, Typography, Button, CardContent} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from "./NavBar";
export function Cars({cars, setCars}){
useEffect(() => {
    getAllCars(setCars).then((cars) => {
    });
}, []);
return(
<Grid>
{cars.map((cars) => {
    return (<>
        <NavBar/>
        <Grid item key={cars.vehicle_id}>
            <Card>
                <CardContent>
                    <img src={cars.image} alt={cars.description} style={{ maxWidth: '100%', height: 'auto' }}/>
                    <Typography variant="h5">{cars.make}</Typography>
                    <Typography variant="h6">{cars.model}</Typography>
                    <Typography variant="h6">{cars.price}</Typography>
                    <Typography variant="body1">{cars.description}</Typography>
                    <Button variant="contained">Vehicle Single View</Button>
                </CardContent>
            </Card>
        </Grid>
   </> );
})}
</Grid>)
}
export default Cars;