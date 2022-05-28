import React, { useDebugValue, useEffect, useState } from "react"

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
import UserAccount from "./UserAccount";
import HotSauces from './HotSauces'
import BBQsauces from "./BBQsauces";
import Register from "./Register";


const App = () => {
  const [APIHealth, setAPIHealth] = useState('');

  //holds state of token to be used for login and logout check
  const [token, setToken] = useState('')

  console.log("Hello!")

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("")
  
  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    const token =localStorage.getItem("token");
    const storedUsername =localStorage.getItem("username");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    if (storedUsername) {
      setUsername(storedUsername)
    } else {
      setUsername("")
    }
    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);


  return (

<Router>
    <div className="app-container">
        <h1>SAUCE SPOT</h1>
        <h2>Welcome, {username}</h2>
        <p>API Status: {APIHealth}</p>
        <Route><Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/></Route>

    <Switch> 
      <Route path= "/profile"><UserAccount username={username} /></Route>

      <Route exact path= "/products"><Products/></Route>
      <Route path= "/products/hotshop"><HotSauces/></Route>
      <Route path= "/products/smokeshop"><BBQsauces/></Route>
      <Route path= "/register"><Register/></Route>
      
    </Switch>

    </div>
    </Router>
  );
};

export default App;
