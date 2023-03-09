import React from "react";
import {AppBar, Button, Typography, IconButton, useTheme, useMediaQuery, Toolbar, Tabs 
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavBar = () => {
return (
    <AppBar>
        <Toolbar>
            <IconButton size="large">
                <MenuIcon/>
            </IconButton>
            <Typography variant ="h4">
                Luxury Motors
            </Typography>
            <Button sx={{ background: "#bcaaa4" }}>Vehicles</Button>
            <Button sx={{ background: "#bcaaa4" }}>Account</Button>
            <Button sx={{ background: "#bcaaa4" }}>Checkout</Button>
            <AccountCircleIcon/>
        </Toolbar>
    </AppBar>
)
}

export default NavBar;