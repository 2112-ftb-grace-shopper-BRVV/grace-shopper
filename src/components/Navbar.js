import React from 'react';
import { Link, Route } from 'react-router-dom';
import Login from './logIn';
// import {isLoggedIn, setIsLoggedIn}


const Navbar =(props)=>{
    const {isLoggedIn, setIsLoggedIn} = props
    
        return (
        <nav style={{ display: "flex", width: "100%", height: "10vw", alignItems: "center", background: "linear-gradient(to bottom, grey, white" }}>

          <Link to="/" style={{ textDecoration: "none", color: "grey" }}>
            <h1 style={{ display:"flex",justifyContent:"flex-start",alignContent:"center", flexDirection:"row", color: "black", letterSpacing: "1px",marginLeft:"5vw" }}> SAUCE SP<img style={{ height: "25px", width: "30px" }} src="https://cdn-icons-png.flaticon.com/128/3/3835.png" />T</h1>
          </Link>

          <Route>
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>

          <Link to="/products/hotshop" className='navtab' >SAUCES
          </Link>

          <Link className='navtab' to="/cart">CART
          </Link>

          <Link to="/Register" className='navtab' >SIGN UP
          </Link>
      </nav>
      
    )}

export default Navbar;