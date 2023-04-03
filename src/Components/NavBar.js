import React, { useEffect, useState } from "react";
import { getCart, deleteCartItem} from "../allApiCalls";
import {AppBar, Button, Typography, Toolbar, Tab, Tabs,Modal,Box} from "@mui/material";
import { Navigate } from "react-router-dom";
import styles from './Navbar.module.css'
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
  const admin = localStorage.getItem("isadmin")
  const [open, setOpen] = React.useState(false);
  const[edit,setEdit]=React.useState(false)
  const[order,setOrder]=React.useState(false)
  const[cart,setCart]=useState([])
  const[checkout,setCheckout]=useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
useEffect(()=>{
  getCart(id,setCart)
 

},[])

console.log()
function sum(){
  let result = 0
  cart.map((ele,ind)=>{
    result+=ele.price
  })
  return result
}
  return (
    checkout?<Navigate to='/checkout'/>:
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
                console.log(ele)
                return (<div key={ele.vehicle_id}className={styles.cartcontainer}>
                  <p>Make: {cart[ind].make}</p>
                  <p>Model: {cart[ind].model}</p>
                  <p>Price: {cart[ind].price}</p>
                  <button onClick={()=>{
                    deleteCartItem(ele.vehicle_id)
                  }}>Remove</button>
                </div>)
              })
            }
            <p>Total:{sum(cart)}</p>
            <button onClick={()=>setCheckout(true)}>Checkout</button>
         </div> )
        }
      </Typography>
    </Box>
  </Modal></>:
      <AppBar>
      <Toolbar >
          <>
            <Typography sx={{ fontSize: "2rem" }}>
              McIntire Motors
            </Typography>
          </>
            <Tabs
              sx={{ marginLeft: "auto",color:'white' }}
            >
              <Tab sx={{color:'white'}} href="http://localhost:3000/" label='Home'/>
              <Tab sx={{color:'white'}} href="http://localhost:3000/cars" label='Cars'/>
              {admin?<Tab sx={{color:'white'}} href="http://localhost:3000/admin" label='Admin'/>:null}
            </Tabs>
            {id?(<>
             
             <Button sx={{ padding: "8px", marginLeft: "auto" }} variant="contained" href="http://localhost:3000/" onClick={()=>{
              localStorage.removeItem('id')
              localStorage.removeItem('user')
              localStorage.removeItem('token')
              localStorage.removeItem('isadmin')
             }} >Logout
             </Button>
             <Button sx={{ padding: "8px", margin: "10px" }} variant="contained" onClick={()=>{
                handleOpen()
                getCart(id,setCart)
              }}>
               Cart
              </Button>
             </>):(<>
            <Button sx={{ padding: "8px", marginLeft: "auto" }} variant="contained" href="http://localhost:3000/login">LogIn
            </Button>
            <Button sx={{ padding: "8px", margin: "10px" }} variant="contained" href="http://localhost:3000/register">
             Register
            </Button>
            </>)}
            
      </Toolbar>
    </AppBar>
  )
  }
  export default NavBar;