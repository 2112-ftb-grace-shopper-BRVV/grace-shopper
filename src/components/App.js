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
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import '../style/App.css';
import Products from './Products';
import Login from "./logIn";

import HotSauces from './HotSauces'
import SingleProduct from "./singleProduct";
import Cart from "./cart";
import Checkout from "./checkout";



const App = () => {
  const [products, setProducts] = useState([])

  const [APIHealth, setAPIHealth] = useState('');

  //holds state of token to be used for login and logout check
  const [token, setToken] = useState('')

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

  console.log("Hello!")

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  
  useEffect(() => {
    getDisplayProducts()
    .catch(console.error)
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };
    WebFont.load({
      google: {
        families: [ 'Chivo', 'sans-serif']
      }
    })

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
    <div style={ {color: "grey", fontFamily: ['Chivo', 'sans-serif']}}className="app-container">
      <nav style={{display:"flex", width:"100%", height:"10vw",  alignItems:"center", justifyContent:"flex-start", background:"linear-gradient(to bottom, lightgrey, white",}}>
    <Link to ="/" style={{textDecoration:"none", color:"grey"}}>
         <h1 style={{color:"black" ,letterSpacing:"-2px", marginRight:"75vw"}}> SAUCE  SP<img style= {{  height: "20px", width: "25px"}}src="https://cdn-icons-png.flaticon.com/128/3/3835.png"/>T</h1></Link>
         <Link to ="/products/hotshop" style={{textDecoration:"none", color:"black", marginRight:"2vw"}}>SAUCES</Link>
         <Link style={{textDecoration:"none", color:"black"}}to ="/cart">CART</Link>
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
        <Route exact path= "/products"><Products/></Route>
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
        <Route><Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/></Route>
        </body>
        <footer>
      <p>Created by: TEAM BANANA</p>
    </footer>
    </div>

    </Router>
  );
};

export default App;
