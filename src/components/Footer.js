import React from 'react';
import { Link, Route } from 'react-router-dom';




const Footer =(props)=>{
    
        return (<footer style={{display:"flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center", width:"100%", height:"5vw" }}>
            <p>Created by: TEAM BANANA</p>
            
            <a style={{ color:"grey", marginBottom:"20px"}}href="https://github.com/2112-ftb-grace-shopper-BRVV/grace-shopper">Click here to check out our GitHub repo!</a>
          </footer>
      
    )}

export default Footer;