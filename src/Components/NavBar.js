import React from "react";
import Link from '@mui/material/Link';
import {AppBar, Button, Typography, IconButton, useTheme, useMediaQuery, Toolbar, Tab, Tabs} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { padding } from "@mui/system";
const NavBar = () => {
return (
    <AppBar>
    <Toolbar>
        <>
          <Typography sx={{ fontSize: "2rem" }}>
            McIntire Motors
          </Typography>
        </>
          <Tabs
            sx={{ marginLeft: "auto" }}
            textColor="inherit"
          >
            <Tab href="http://localhost:3000/" label='Home'/>
            <Tab href="http://localhost:3000/cars" label='Cars'/>
            <Tab href="http://localhost:3000/account" label='Account'/>
          </Tabs>
          <Button sx={{ padding: "8px", marginLeft: "auto" }} variant="contained" href="http://localhost:3000/login">LogIn
          </Button>
          <Button sx={{ padding: "8px", margin: "10px" }} variant="contained" href="http://localhost:3000/register">
           Register
          </Button>
          <AccountCircleIcon size="large"/>
    </Toolbar>
  </AppBar>
)
}
export default NavBar;