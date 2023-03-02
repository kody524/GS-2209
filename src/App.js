import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";
import './App.css';
import Home from "./Home";
import { useState } from "react";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    errorElement : <NotFound/>,
    children: [

    ],
  },
])




export default App;