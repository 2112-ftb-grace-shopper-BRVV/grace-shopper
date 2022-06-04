import React from 'react';
import { Link, Route } from 'react-router-dom';




const Footer =(props)=>{
    
        return (<footer style={{display:"flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", width:"100%", height:"5vw" }}>
            <p>Created by: TEAM BANANA</p>
            
            <a href="https://github.com/2112-ftb-grace-shopper-BRVV/grace-shopper">Check out our awesome GitHub repo!</a>
          </footer>
      
    )}

export default Footer;