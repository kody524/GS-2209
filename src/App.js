import { Cars } from "./Cars";
import React, { useState, useEffect } from "react";
import "./App.css";

import { SignIn } from "./Login";
import { SignUp } from "./Register";
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
console.log("first",firstname,lastname)
  return (
    

  );
}

export default App;
