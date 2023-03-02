import logo from './logo.svg';import { Cars } from './Cars';
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



function App() {
  return (<>
    <Cars/>
  <h1>hello</h1>
  </>
  );
}

export default App;