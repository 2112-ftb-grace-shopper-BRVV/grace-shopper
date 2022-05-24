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
import Register from "./Register";

const App = () => {
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

    if (token.length) {
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
    <div className="app-container">
        <h1>Hello, World!</h1>
        <p>API Status: {APIHealth}</p>
        <Route><Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/></Route>
    <Switch>   
      {/* {token? null :(<Route><Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/></Route>)} */}
      <Route path= "/products"><Products isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/></Route>
      <Route path= "/register"><Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/></Route>
    
    </Switch>

    </div>
    </Router>
  );
};

export default App;
