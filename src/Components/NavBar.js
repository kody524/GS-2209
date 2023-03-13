import React, { useEffect, useState } from "react";
import Link from '@mui/material/Link';
import { getCart} from "../allApiCalls";
import {AppBar, Button, Typography, IconButton, useTheme, useMediaQuery, Toolbar, Tab, Tabs,Modal,Box} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { padding } from "@mui/system";
import { Navigate } from "react-router-dom";
import styles from './Navbar.module.css'
import { logDOM } from "@testing-library/react";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const NavBar = ({loginSuccess}) => {
  const id = localStorage.getItem("id")
  const [open, setOpen] = React.useState(false);
  const[edit,setEdit]=React.useState(false)
  const[order,setOrder]=React.useState(false)
  const[cart,setCart]=useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



console.log(loginSuccess)
  return (
    open?<>
    <NavBar/>
    <Modal
    open={open}
    onClose={()=>{handleClose()
    setEdit(false)
    setOrder(false)
    }}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
    
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {
          cart<1?(
            <p>No items in Cart</p>
          ):(<div>
            <h2>Cart</h2>
            {
              cart.map((ele,ind)=>{
                return (<div className={styles.cartcontainer}>
                  <p>Make: {cart[ind].make}</p>
                  <p>Model: {cart[ind].model}</p>
                  <p>Price: {cart[ind].price}</p>
                  <button>Remove</button>
                </div>)
              })
            }
            <p>Total:</p>
            <button>Checkout</button>
         </div> )
        }
      </Typography>
    </Box>
  </Modal></>:
      <AppBar>
      <Toolbar>
          <>
            <Typography sx={{ fontSize: "2rem" }}>
              McIntire Motors
            </Typography>
          </>
            <Tabs
              sx={{ marginLeft: "auto" }}
            >
              <Tab href="http://localhost:3000/" label='Home'/>
              <Tab href="http://localhost:3000/cars" label='Cars'/>
              <Tab href="http://localhost:3000/account" label='Account'/>
            </Tabs>
            {loginSuccess?(
             <Button sx={{ padding: "8px", marginLeft: "auto" }} variant="contained" href="http://localhost:3000/login">Logout
             </Button>):(<>
            <Button sx={{ padding: "8px", marginLeft: "auto" }} variant="contained" href="http://localhost:3000/login">LogIn
            </Button>
            <Button sx={{ padding: "8px", margin: "10px" }} variant="contained" href="http://localhost:3000/register">
             Register
            </Button>
            </>)}
            <Button sx={{ padding: "8px", margin: "10px" }} variant="contained" onClick={()=>{
              handleOpen()
              getCart(1,setCart)
            }}>
             Cart
            </Button>
      </Toolbar>
    </AppBar>
  )
  }
  export default NavBar;