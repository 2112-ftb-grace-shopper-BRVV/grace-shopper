import React, { useDebugValue, useEffect, useState, Component } from "react"
import WebFont from 'webfontloader';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { getAPIHealth } from '../axios-services';
import '../style/App.css';
import Products from './Products';
import Login from "./logIn";
import HotSauces from './HotSauces'
import SingleProduct from "./singleProduct";
import Cart from "./cart";
import Checkout from "./checkout";
import Register from "./Register";
import Notfound from "./Notfound.js";
import Home from "./Home";
import Navbar from "./Navbar";
import Footer from "./Footer";

const App = () => {
  const [products, setProducts] = useState([])
  const [APIHealth, setAPIHealth] = useState('');
  const [isAdmin, setIsAdmin] = useState(false)
  const [username, setUsername] = useState("")
  const [userInfo, setUserInfo] = useState({})
  //   useEffect( async() => {

  //holds state of token to be used for login and logout check
  const getDisplayProducts = async () => {
    try {
      const result = await fetch('http://localhost:4000/api/products');
      const prod = await result.json()
      console.log(prod)
      let display = []
      for (let i = 0; i < prod.length; i++) {
        if (i % 6 === 0) {
          display.push(prod[i])
        }
      }
      console.log(display)
      setProducts(display)

    } catch (error) {
      console.error(error)
    }
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(async () => {
    try {
      const response = await fetch('http://localhost:4000/api/user/profile', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const json = await response.json();
      setUserInfo(json)
    } catch (error) {
      console.error(error, "Something went wrong")
    }
    getDisplayProducts()
      .catch(console.error)

    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };
    WebFont.load({
      google: {
        families: ['Chivo', 'sans-serif']
      }
    })

    const storedUsername = localStorage.getItem("username")
    if (token && token.length) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (storedUsername) {
      setUsername(storedUsername)
    } else {
      setUsername("")
    }
    getAPIStatus();
  }, []);

  return (
    //         {userInfo.isAdmin ? <Route exact path= "/products"><Products/></Route> : null}
    <Router>
      <div style={{ color: "grey", fontFamily: ['Chivo', 'sans-serif'] }} className="app-container">
      <header>
      <Link to="/" style={{ textDecoration: "none", color: "grey", display:"flex", alignItems:"center",fontWeight:"bold" }}>
            <h1 style={{ display:"flex",justifyContent:"flex-start",alignContent:"center", flexDirection:"row", color: "black", letterSpacing: "-2px",marginLeft:"1vw" }}> 
            SAUCE  SP
            <img style={{ height: "30px", width: "35px", marginTop:"3px", marginLeft:"-3px", marginRight:"-5px"}}
             src="https://cdn-icons-png.flaticon.com/128/3/3835.png" />T</h1>
          </Link>
      <Route><Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/></Route>
      </header>

        <body style={{ display: "flex", alignItems: "center", justifyContent:"space-between", flexDirection: "column" }}>
          <Switch>
            <Route exact path="/">
              <Home products={products}></Home>
            </Route>
            {userInfo.isAdmin ? <Route exact path="/products"><Products /></Route> : null}
            <Route exact path="/products/hotshop">
              <h1 style={{ color: "grey",marginBottom:"50px" }}>BROWSE OUR HOT SAUCES</h1>
              <h3>PICK YOUR HEAT.</h3>
              <HotSauces />
            </Route>
            < Route exact path="/products/hotshop/:id">
              <Link to="/products/hotshop" style={{ textDecoration: "none", color: "black", opacity: "50%" }}>GO BACK</Link>
              <SingleProduct />
            </Route>
            < Route exact path="/cart">
              <h1 style={{ color: "grey" }}>Your Cart</h1>
              <Cart />
            </Route>
            <Route exact path="/cart/checkout">
              <div style={{ display: "flex", flexDirection: "row" }}>
                < Checkout />
              </div>
            </Route>

            <Route exact path="/register"><Register /></Route>
            <Route path="/*"><Notfound /></Route>
          </Switch>
          <Route><Footer/></Route>   
        </body>
        
      </div>
      
    </Router>

  );
}

export default App;