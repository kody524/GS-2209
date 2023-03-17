import { Cars } from "./Components/Cars";
import React, { useState, useEffect } from "react";
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./Components/Login";
import { SignUp } from "./Components/Register";
import EditCar from "./Components/Editcar";
import NavBar from './Components/NavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Login } from "@mui/icons-material";
import Home from "./Components/Home";
import AdminEditCar from "./Components/Admin";
import Admin from "./Components/Admin";
import Checkout from "./Components/Checkout";
import AddCar from "./Components/AddCar";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7D1E1E',
    },
    secondary: {
      main: '#6B5656',
    },
    background: {
      default: '#2A373F',
      paper: '#BCAAA4',
    },
    text: {
      primary: 'rgba(63,53,53,0.87)',
      secondary: 'rgba(65,56,56,0.87)',
      disabled: 'rgba(49,46,46,0.87)',
    },
  },
});

function App() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const[token,setToken]=useState('')
  const[userId,setUserId]=useState(0)
  const[cars,setCars]=useState([])
  const[success,setSuccess]=useState(false)
const[loginSuccess,setLoginSuccess]=useState(false)
const[car,setCar]=useState([])
const[carId,setCarId]=useState(0)


  return (
   
    <>
     <BrowserRouter>
     <Routes>
      <Route
      path="/"
      element={<Home loginSuccess={loginSuccess}/>}
      >
      </Route>
      <Route
      path="/login"
      element={<SignIn username={username} setUsername={setUsername} password={password} setPassword={setPassword} setToken={setToken} setUserId={setUserId} token={token}  userId={userId} setLoginSuccess={setLoginSuccess} loginSuccess={loginSuccess} />}
      >
      </Route>
      <Route
      path="/register"
      element={<SignUp firstname={firstname} setFirstName={setFirstName} lastname={lastname} setLastName={setLastName} email={email} setEmail={setEmail} street={street} setStreet={setStreet} zip={zip} setZip={setZip} phone={phone} setPhone={setPhone} success={success}
      city={city} setCity={setCity} state={state} setState={setState} setSuccess={setSuccess} username={username} setUsername={setUsername} password={password} setPassword={setPassword} loginSuccess={loginSuccess}/>}
      ></Route>
      <Route 
      path="/cars"
      element={<Cars cars={cars} setCars={setCars} car={car} setCar={setCar} setCarId={setCarId} loginSuccess={loginSuccess}/>}
      >
      </Route>
      <Route
      path="/editcar"
      element={<EditCar carId={carId} car={car} setCar={setCar}/>}
      >
      </Route>
      <Route 
      path="/admin"
      element={<Admin/>}
      >
        
      </Route>
      <Route
        path='/checkout'
        element={<Checkout/>}
        >
        </Route>
        <Route path='/addcar'element={<AddCar/>}>
        </Route>
     </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
