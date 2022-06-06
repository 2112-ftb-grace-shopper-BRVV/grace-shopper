import React from 'react';
import { Link, Route } from 'react-router-dom';
import Login from './logIn';
import '../style/nav.css';
// import {isLoggedIn, setIsLoggedIn}


const Navbar =(props)=>{
    const {isLoggedIn, setIsLoggedIn} = props
    
        return (

  
        <nav>
          {/* background: "linear-gradient(to bottom, lightgrey, white" */}
          <ul>
          <li>
          <Link  style={{textDecoration:"none", color:"black"}}to="/cart">CART
          </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none", color:"black"}}to="/Register"  >SIGN UP
          </Link>
          </li>
          <li>
          <Link style={{textDecoration:"none", color:"black"}} to="/products/hotshop" >SAUCES
          </Link>
          </li>
          <li>
          <Route>
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          </li>
          </ul>
          

      </nav>


          
          
      
      
    )}
        

export default Navbar;