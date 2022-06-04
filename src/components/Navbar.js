import React from 'react';
import { Link, Route } from 'react-router-dom';
import Login from './logIn';
// import {isLoggedIn, setIsLoggedIn}


const Navbar =(props)=>{
    const {isLoggedIn, setIsLoggedIn} = props
    
        return (<nav style={{ display: "flex", width: "100%", height: "10vw", alignItems: "center", justifyContent: "flex-start", background: "linear-gradient(to bottom, lightgrey, white", }}>
        <Link to="/" style={{ textDecoration: "none", color: "grey" }}>
          <h1 style={{ color: "black", letterSpacing: "-2px", marginRight: "50vw" }}> SAUCE  SP<img style={{ height: "20px", width: "50px" }} src="https://cdn-icons-png.flaticon.com/128/3/3835.png" />T</h1></Link>
        <Route><Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /></Route>
        <Link to="/products/hotshop" style={{ textDecoration: "none", color: "black", marginRight: "2vw" }}>SAUCES</Link>
        <Link style={{ textDecoration: "none", color: "black" }} to="/cart">CART</Link>
        <Link to="/Register" style={{ textDecoration: "none", color: "black", marginRight: "2vw", marginLeft: "2vw" }}>REGISTER</Link>
      </nav>
      
    )}

export default Navbar;