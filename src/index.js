import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Cars from './Components/Cars';
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Admin from './Components/Admin';
import Home from './Components/Home';
import Cart from './Components/Cart';

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
  } from "react-router-dom";

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Home />}>
        <Route path="Cars" element={<Cars />} />
        <Route path="Login" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Admin" element={<Admin />} />
        <Route path="Cart" element={<Cart />} />
      </Route>
    )
  );
  

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
