import React, {useState,useEffect} from "react";
import { getAllCars, getSingleCar, addToCart , deleteCar} from "../allApiCalls";
import {Card, Grid, Typography, Button, CardContent, Dialog, Modal, CardActionArea, ButtonGroup} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NavBar from "./NavBar";
import { Navigate, useParams } from "react-router-dom";
import { borderRadius, flexbox } from "@mui/system";
import EditCar from "./Editcar";
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
export function Cars({cars, setCars, car, setCar,setCarId,loginSuccess}){
    const isAdmin = localStorage.getItem('isadmin')
    const {carId} = useParams()
    const [searchValue, setSearchValue] = useState('')
    const [filteredCars, setFilteredCars] = useState([])
useEffect(() => {
    getAllCars(setCars).then(cars);
    },[]);
useEffect(() => {
    setFilteredCars(cars.filter(elem => {
        return elem.make.toLowerCase().includes(searchValue) ||
        elem.model.toLowerCase().includes(searchValue)
        })
    )
}, [searchValue])
    const id = localStorage.getItem("id")
    const [open, setOpen] = React.useState(false);
    const[edit,setEdit]=useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const editHandle=()=>setEdit(!edit)
return(
    
<>
{edit?<Navigate to='/editcar'/>:null}
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
                  <Typography>{car.make}</Typography>
                  <Typography>{car.model}</Typography>
                  <Typography>Year: {car.description}</Typography>
                  <Typography>Inventory: {car.inventory}</Typography>
                  <Typography>Condition: {car.condition}</Typography>
                  <Typography>Engine: {car.engine}</Typography>
                  <Typography>Transmission: {car.transmission}</Typography>
                  <Typography>Drivetrain: {car.drivetrain}</Typography>
                  <Typography>Fuel Type: {car.fuel}</Typography>
                  <Typography>Exterior Color: {car.exteriorcolor}</Typography>
                  <Typography>Interior Color: {car.interiorcolor}</Typography>
                  <Typography>Description: {car.description}</Typography>
                  <Typography>Price: {car.price}</Typography>
                    <Button sx={{mr:2}} variant="contained" onClick={()=>{
                    handleClose()
                  }}>Return to All Vehicles</Button>
                    {id?<Button variant="contained" onClick={()=>{addToCart(id,false,car.id,1)}}>Add to Cart</Button>:null}
                    
      </Typography>
    </Card>
  </Modal>
<h1>Cars</h1>
<h2>Search</h2>
<input
    type = "text"
    placeholder='search cars'
    value = {searchValue}
    onChange = {(event) => {setSearchValue(event.target.value)}}
/>
{!searchValue ?
<Grid  item container xs={6} className={styles.carContainer}>
{cars.map((cars) => {
   
    return(
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
                                getSingleCar(cars.id,setCar)}}
                                >Vehicle Details</Button>
                               {id? <Button variant="contained"sx={{mr:2, borderRadius:3}} onClick={()=>{addToCart(id,false,cars.id,1)}}>
                                Add To Cart
                                <AddShoppingCartIcon/>
                            </Button>:null}
                            {isAdmin?<Button variant="contained" onClick={()=>{
                                editHandle()
                                setCarId(cars.id)
                            }}>Edit Car</Button>:null}
                            {isAdmin?<Button variant="contained" onClick={()=>{
                                deleteCar(cars.id)
                            }}>Delete Car</Button>:null}
                            </ButtonGroup>
                        </CardContent>
            </Card>);
})}</Grid>:
<Grid  item container xs={6} className={styles.carContainer}>
{filteredCars.map((cars) => {
    return(
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
                                getSingleCar(cars.id,setCar)}}
                                >Vehicle Details</Button>
                                {id?<Button variant="contained"sx={{mr:2, borderRadius:3}} onClick={()=>{addToCart(id,false,cars.id,1)}}>
                                Add To Cart
                                <AddShoppingCartIcon/>
                            </Button>:null}
                            </ButtonGroup>
                        </CardContent>
            </Card>);
})}</Grid>}</>)
}
export default Cars;