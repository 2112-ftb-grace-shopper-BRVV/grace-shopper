import React from "react"
import {
  Link
} from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from 'react-responsive-carousel';
import '../style/App.css';

const Home = ({products}) => {

  return (
      <div  style={{display:"flex", alignItems:"center", flexDirection:"column"}}>
          <h1 style={{ color: "black",marginBottom: "30px", fontWeight:"bolder" }}> WELCOME TO THE SAUCE SPOT</h1>
          <h2 style={{ color: "grey", marginBottom:"25px" }}> WE BRING THE FLAVOR</h2>
          <h3 style={{  color: "grey", marginBottom: "50px" }}>YOU CHOOSE THE  HEAT</h3>
          <Link to="/products/hotshop" style={{ textDecoration: "none" }}> <img src="https://cdn.cnn.com/cnnnext/dam/assets/200910112834-hotsaucelead.jpg" style={{ height: "500px", width: "1000px" }}></img></Link>

          <h4 style={{ marginTop: "100px" }}>BROWSE OUR BEST SELLERS</h4>


            <Carousel autoPlay>
              {products.map((p => {
                return (
                  <Link to={{
                    pathname: "/products/hotshop" + `/${p.id}`
                  }} style={{ textDecoration: "none", color: "grey" }} >
                    <div id={p.id} style={{ width: "150px", height: "150px", marginBottom:"20px" }} >
                      <img style={{ width: "150px", height: "150px" }} src={p.img} alt="TOP SELLERS" />
                    </div>
                  </Link>
                )

              }))}
 </Carousel>

</div>

  );
}

export default Home;