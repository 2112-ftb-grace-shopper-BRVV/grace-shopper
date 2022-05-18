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

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');

  console.log("Hello!")

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);


  return (

<Router>
    <div className="app-container">
        <h1>Hello, World!</h1>
        <p>API Status: {APIHealth}</p>
    <Switch>   
      
      <Products/>
    
    
    </Switch>

    </div>
    </Router>
  );
};

export default App;
