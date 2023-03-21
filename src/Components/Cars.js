import React, {useState,useEffect} from "react";
import { getAllCars, getSingleCar, addToCart , deleteCar} from "../allApiCalls";
import {Card, Grid, TextField, Typography, Button, CardContent, Dialog, Modal, CardActionArea, ButtonGroup} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import NavBar from "./NavBar";
import { Navigate, useParams } from "react-router-dom";
import { borderRadius, flexbox } from "@mui/system";
import EditCar from "./Editcar";
import styles from './Cars.module.css'
import SearchIcon from '@mui/icons-material/Search';
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
    const[add,setAdd]=useState(false)
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const editHandle=()=>setEdit(!edit)
return(
    
<>
{add?<Navigate to='/addcar'/>:null}
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
            <Card style ={style1} sx={{ alignitems:"center", justifyContent:"center", objectFit:"contain", display:"flex", maxWidth:"75%", flexFlow:"column" }}>
                  <img src={car.img} alt={car.make} sx={{alignitems:"center", justifyContent:"center"}}></img>
            </Card>
            <div style={{display:"flex", flexDirection:"column", textAlign:"center"}}>
                  <Typography><h2>{car.make}</h2></Typography>
                  <Typography><h3>{car.model}</h3></Typography>
            </div>
                  <Typography><b>Year:</b> {car.description}</Typography>
                  <Typography><b>Inventory:</b> {car.inventory}</Typography>
                  <Typography><b>Condition:</b> {car.condition}</Typography>
                  <Typography><b>Engine:</b> {car.engine}</Typography>
                  <Typography><b>Transmission:</b> {car.transmission}</Typography>
                  <Typography><b>Drivetrain:</b> {car.drivetrain}</Typography>
                  <Typography><b>Fuel Type:</b> {car.fuel}</Typography>
                  <Typography><b>Exterior Color:</b> {car.exteriorcolor}</Typography>
                  <Typography><b>Interior Color:</b> {car.interiorcolor}</Typography>
                  <Typography><b>Description:</b> {car.description}</Typography>
                  <Typography><b>Price:</b> ${car.price}</Typography>
                    <Button sx={{mr:2}} variant="contained" onClick={()=>{
                    handleClose()
                  }}>Return to All Vehicles</Button>
                    {id?<Button variant="contained" onClick={()=>{addToCart(id,false,car.id,1)}}>Add to Cart</Button>:null}
                    
      </Typography>
    </Card>
  </Modal>
<h1>Cars</h1>
<div style={{display:'flex', alignitems:"center", justifyContent:"center"}}>
<SearchIcon size="large" style={style1}/>
<TextField variant="filled"
style={{backgroundColor:'white'}}
    type = "text"
    placeholder='search cars'
    value = {searchValue}
    onChange = {(event) => {setSearchValue(event.target.value)}}
/>
</div>
{isAdmin?<div style={{display:'flex', alignitems:"center", justifyContent:"center"}}><Button onClick={()=>setAdd(!add)} variant="contained">Add Car</Button></div>:null}
{!searchValue ?
<Grid  item container sm={12} sx={{display:"flex", flexDirection:"row",justifyContent:'center'}}>
{cars.map((cars) => {
   
    return(
            <Card sm={12} key={cars.id} style ={style1} sx={{ alignitems:"center", justifyContent:"center", objectFit:"contain", display:"flex", maxWidth:"50%" }}>
                        <CardContent style={{width:'75%'}}>
                            <img src={cars.img} alt={cars.make} style={{ alignitems:"center", width: '99%', maxheight: '50%' }}/>
                        </CardContent>
                        <CardContent sx={{textAlign:"center",paddingTop:15}}>
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
                            {isAdmin?<Button variant="contained"sx={{mr:2, borderRadius:3}} onClick={()=>{
                                editHandle()
                                setCarId(cars.id)
                            }}>Edit Car</Button>:null}
                            {isAdmin?<Button variant="contained"sx={{mr:2, borderRadius:3}} onClick={()=>{
                                deleteCar(cars.id)
                            }}>Delete Car</Button>:null}
                            </ButtonGroup>
                        </CardContent>
            </Card>);
})}</Grid>:
<Grid  item container sm={12} sx={{display:"flex", flexDirection:"row",justifyContent:'center'}}>
{filteredCars.map((cars) => {
    return(
        <Card sm={12} key={cars.id} style ={style1} sx={{ alignitems:"center", justifyContent:"center", objectFit:"contain", display:"flex", maxWidth:"50%" }}>
                        <CardContent style={{width:'75%'}}>
                            <img src={cars.img} alt={cars.make} style={{ alignitems:"center", width: '99%', maxheight: '50%' }}/>
                        </CardContent>
                        <CardContent sx={{textAlign:"center",paddingTop:15}}>
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
                            {isAdmin?<Button variant="contained"sx={{mr:2, borderRadius:3}} onClick={()=>{
                                editHandle()
                                setCarId(cars.id)
                            }}>Edit Car</Button>:null}
                            {isAdmin?<Button variant="contained"sx={{ml:2, borderRadius:3}} onClick={()=>{
                                deleteCar(cars.id)
                            }}>Delete Car</Button>:null}
                            </ButtonGroup>
                        </CardContent>
            </Card>);
})}</Grid>}</>)
}
export default Cars;