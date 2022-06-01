import React, { useDebugValue, useEffect, useState } from "react"
import WebFont from 'webfontloader';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';
import Products from './Products';
import Login from "./logIn";

import HotSauces from './HotSauces'
import SingleProduct from "./singleProduct";



const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: [ 'Chivo', 'sans-serif']
      }
    });
   }, []);
  const [APIHealth, setAPIHealth] = useState('');

  //holds state of token to be used for login and logout check
  const [token, setToken] = useState('')

  console.log("Hello!")

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  
  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    const token =localStorage.getItem("token");

    if (token && token.length) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);


  return (

<Router>
    <div  style={ {color: "grey", fontFamily: ['Chivo', 'sans-serif']}}className="app-container">
        <h1 style={{color:"black", letterSpacing:"-2px"}}>
          SAUCE  SP<img style= {{  height: "25px", width: "30px"}}src="https://cdn-icons-png.flaticon.com/128/3/3835.png"/>T
          </h1>
        <p>API Status: {APIHealth}</p>
        < Route exact path= "/products/singleProduct"><SingleProduct/></Route>
        <Route exact path= "/products"><Products/></Route>
        <Route path= "/products/hotshop"><HotSauces/></Route>
        <Route><Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/></Route>



    </div>
    </Router>
  );
};

export default App;
