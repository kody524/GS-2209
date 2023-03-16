import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import NavBar from "./NavBar";
import { getSingleCar ,editCar} from '../allApiCalls';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme();

export default function EditCar({carId,car,setCar}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   
  };
  const[make,setMake]=React.useState('')
  const[model,setModel]=React.useState('')
  const[year,setYear]=React.useState('')
  const[price,setPrice]=React.useState('')
  const[condition,setCondition]=React.useState('')
  const[engine,setEngine]=React.useState('')
  const[transmission,setTransmission]=React.useState('')
  const[drivetrain,setDrivetrain]=React.useState('')
  const[fuel,setFuel]=React.useState('')
  const[exteriorcolor,setExteriorColor]=React.useState('')
  const[interiorcolor,setInteriorColor]=React.useState('')
  const[description,setDescription]=React.useState('')
React.useEffect(()=>{
getSingleCar(carId,setCar)
},[])

  return (<>
    <NavBar/>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h1" variant="h5">
            Edit Car
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label={car.make}
                  autoFocus
                  onChange={(e)=>setMake(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label={car.model}
                  name="lastName"
                  autoComplete="family-name"
                  onChange={(e)=>setModel(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={car.year}
                  name="email"
                  autoComplete="email"
                  onChange={(e)=>setYear(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={car.price}
                
                  autoComplete="new-password"
                  onChange={(e)=>setPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={car.condition}
                
                  autoComplete="new-password"
                  onChange={(e)=>setCondition(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={car.engine}
                 
                  autoComplete="new-password"
                  onChange={(e)=>setEngine(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={car.transmission}
                 
                  autoComplete="new-password"
                  onChange={(e)=>setTransmission(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={car.drivetrain}
                 
                  autoComplete="new-password"
                  onChange={(e)=>setDrivetrain(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={car.fuel}
              
                  autoComplete="new-password"
                  onChange={(e)=>setFuel(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={car.exteriorcolor}
                 
                  autoComplete="new-password"
                  onChange={(e)=>setExteriorColor(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={car.interiorcolor}
                 
                  autoComplete="new-password"
                  onChange={(e)=>setInteriorColor(e.target.value)}
                />
              </Grid>
                 <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={car.description}
               
                  autoComplete="new-password"
                  onChange={(e)=>setDescription(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>{
                editCar(carId,make,model,year,price,condition,engine,transmission,drivetrain,fuel,exteriorcolor,interiorcolor,description)
              }}
            >
              Sign Up
            </Button>
           
          </Box>
        </Box>
    
      </Container>
    </ThemeProvider>
 </> );
}