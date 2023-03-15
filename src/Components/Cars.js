import React, {useState,useEffect} from "react";
import { getAllCars, getSingleCar } from "../allApiCalls";
import {Card, Grid, Typography, Button, CardContent, Dialog, Modal, CardActionArea, ButtonGroup} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import { borderRadius, flexbox } from "@mui/system";
import styles from './Cars.module.css'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: "15px"
  };
  const style1 = {
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "15px",
    direction: "row"
  };
export function Cars({cars, setCars, car, setCar, loginSuccess}){
    const {carId} = useParams()
useEffect(() => {
    getAllCars(setCars).then(cars);
    },[]);
// useEffect(() => {
//     getSingleCar(carId, setCar)
//     }, [setCar, carId])
    const id = localStorage.getItem("id")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
<Modal
    open={open}
    onClose={()=>{handleClose()
    }}
  >
    <Card sx={style}>
      <Typography  sx={{ mt: 2 }}>
            <h2>Vehicle Details</h2>
                  <img src={cars.img} alt={cars.make}></img>
                  <Typography>{cars.make}</Typography>
                  <Typography>{cars.model}</Typography>
                  <Typography>Year: {cars.description}</Typography>
                  <Typography>Inventory: {cars.make}</Typography>
                  <Typography>Condition: {cars.make}</Typography>
                  <Typography>Engine: {cars.make}</Typography>
                  <Typography>Transmission: {cars.make}</Typography>
                  <Typography>Drivetrain: {cars.make}</Typography>
                  <Typography>Fuel Type: {cars.make}</Typography>
                  <Typography>Exterior Color: {cars.make}</Typography>
                  <Typography>Interior Color: {cars.make}</Typography>
                  <Typography>Description: {cars.make}</Typography>
                  <Typography>Price: {cars.price}</Typography>
                    <Button sx={{mr:2}} variant="contained" onClick={()=>{
                    handleClose()
                  }}>Return to All Vehicles</Button>
                    <Button variant="contained">Add to Cart</Button>
      </Typography>
    </Card>
  </Modal>
<h1>Cars</h1>
<h2>Search</h2>
<input
    type = "text"
    placeholder='search cars'
    value = {searchQuery}
    onChange = {(event) => {updateSearchQuery(event.target.value)}}
/>
<Grid  item container xs={6} className={styles.carContainer}>
{cars.map((cars) => {
    return (<>
            <Card key={cars.id} sx={style1}>
                        <CardContent>
                            <img src={cars.img} alt={cars.make} style={{ alignitems:"center", maxWidth: '50%', maxheight: '50%' }}/>
                        </CardContent>
                        <CardContent>
                            <Typography variant="h4">{cars.make}</Typography>
                            <Typography variant="h5">{cars.model}</Typography>
                            <Typography variant="h6">Price: ${cars.price}</Typography>
                            {/* <Typography variant="body1" nowrap="false" width="30vw" >Description: {cars.description}</Typography> */}
                            <ButtonGroup>
                                <Button variant="contained" sx={{mr:2, ml:2, borderRadius:3}} onClick={()=>{
                                handleOpen()
                                getSingleCar(cars.id)}}
                                >Vehicle Details</Button>
                                <Button variant="contained"sx={{mr:2, borderRadius:3}}>
                                Add To Cart
                                <AddShoppingCartIcon/>
                            </Button>
                            </ButtonGroup>
                        </CardContent>
            </Card>
   </> );
})}</Grid></>)
}
export default Cars;