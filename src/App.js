import { Cars } from "./Components/Cars";
import React, { useState, useEffect } from "react";
import "./App.css";
import { SignIn } from "./Components/Login";
import { SignUp } from "./Components/Register";
import NavBar from './Components/NavBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Login } from "@mui/icons-material";

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


  return (
    <>
      {/* <SignUp
        firstname={firstname}
        setFirstName={setFirstName}
        setLastName={setLastName}
        lastname={lastname}
        email={email}
        setEmail={setEmail}
        street={street}
        setStreet={setStreet}
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
        zip={zip}
        setZip={setZip}
        phone={phone}
        setPhone={setPhone}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      /> */}
      <SignIn setUsername={setUsername} username={username} setPassword={setPassword} password={password}/>
    </>
  );
}

export default App;