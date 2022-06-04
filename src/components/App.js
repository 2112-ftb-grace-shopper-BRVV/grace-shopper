import React, { useDebugValue, useEffect, useState, Component } from "react"
import WebFont from 'webfontloader';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { getAPIHealth } from '../axios-services';
import '../style/App.css';
import Products from './Products';
import Login from "./logIn";
import HotSauces from './HotSauces'
import SingleProduct from "./singleProduct";
import Cart from "./cart";
import Checkout from "./checkout";
import Register from "./Register";

const App = () => {
  const [products, setProducts] = useState([])
  const [APIHealth, setAPIHealth] = useState('');
  const [isAdmin, setIsAdmin] = useState(false)
  const [username, setUsername] = useState("")
  const [userInfo, setUserInfo] = useState({})
//   useEffect( async() => {

  //holds state of token to be used for login and logout check
  const getDisplayProducts= async()=>{
    try {
        const result = await fetch ('http://localhost:4000/api/products');
        const prod = await result.json()
        console.log(prod)
        let display= []
        for(let i=0; i < prod.length; i++){
          if( i % 6 ===0){
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
  const token =localStorage.getItem("token");

    useEffect( async() => {
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
      families: [ 'Chivo', 'sans-serif']
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
    <div style={ {color: "grey", fontFamily: ['Chivo', 'sans-serif']}}className="app-container">
      <nav style={{display:"flex", width:"100%", height:"10vw",  alignItems:"center", justifyContent:"center", background:"linear-gradient(to bottom, lightgrey, white",}}>
    <Link to ="/" style={{textDecoration:"none", color:"grey"}}>
         <h1 style={{color:"black" ,letterSpacing:"-2px",marginRight:"30vw",marginLeft:"10vw",width:"15vw"}}> SAUCE  SP<img style= {{  height: "20px", width: "20px"}}src="https://cdn-icons-png.flaticon.com/128/3/3835.png"/>T</h1></Link>

         <Route><Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/></Route>
         <Link to ="/products/hotshop" style={{textDecoration:"none", color:"black", marginRight:"2vw"}}>SAUCES</Link>
         <Link style={{textDecoration:"none", color:"black"}}to ="/cart">CART</Link>
         <Link to ="/Register" style={{textDecoration:"none", color:"black", marginRight:"2vw", marginLeft:"2vw"}}>REGISTER</Link>
         </nav>
         <Route exact path = "/">
           <h1 style={{color:"black"}}> WELCOME TO THE SAUCE SPOT</h1>
           <h2 style={{color:"grey"}}> WE BRING THE FLAVOR</h2>
           <h3 style={{color:"grey", marginBottom:"50px"}}>YOU CHOOSE THE HEAT</h3>
         <Link to= "/products/hotshop" style={{textDecoration:"none"}}> <img src="https://cdn.cnn.com/cnnnext/dam/assets/200910112834-hotsaucelead.jpg" style={{height:"500px", width:"1000px"}}></img></Link>

         <h4 style={{marginTop:"100px"}}>BROWSE OUR BEST SELLERS</h4>
        
        <div style={{display:"flex", flexDirection:"row"}}>
          <Carousel autoPlay>
         { products.map((p=>{
           return(
            <Link to ={{
              pathname: "/products/hotshop"+`/${p.id}`}} style={{textDecoration:"none", color:"grey"}} >
             <div id={p.id} >
              <img style={{width:"150px", height:"150px"}} src={p.img} alt="TOP SELLERS"/>
             </div>
             </Link>
           )

         }))}
         </Carousel>
         </div>

         
         </Route>
      <body style={{display:"flex",alignItems:"center" ,flexDirection:"column"}}>
      { userInfo.isAdmin ? <Route exact path= "/products"><Products/></Route>: null }
        <Route exact path= "/products/hotshop">
        <h1 style={{color:"grey"}}>OUR HOT SAUCES</h1>
        <h3>PICK YOUR HEAT.</h3><HotSauces/></Route>
         < Route exact path = "/products/hotshop/:id">
           <Link to ="/products/hotshop" style={{ textDecoration:"none", color:"black", opacity:"50%"}}>GO BACK</Link>
           <SingleProduct/></Route>
         < Route exact path = "/cart">
         <h1 style={{color:"grey"}}>Your Cart</h1>
           <Cart/></Route>
        <Route exact path = "/cart/checkout">
          <div style={{display:"flex", flexDirection:"row"}}>
        < Checkout/>
        </div>
        </Route>
        
        <Route exact path ="/register"><Register/></Route>
        </body>
        <footer>
      <p>Created by: TEAM BANANA</p>
    </footer>
    </div>

    </Router>

  );
}

export default App;
