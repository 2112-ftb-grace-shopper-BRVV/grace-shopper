

import React, { useEffect, useState } from "react"
import { useRanger} from "react-ranger";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const HotSauces = ()=>{
    const [products, setProducts] = useState([])
    const [values, setValues] = useState([0]);
    const [cart, setCart] = useState([])
    const [allProducts, setAllProducts]=  useState([])
    const [quantity, setQuantity] = useState(1)
    const [cartTotal, setCartTotal]= useState(0)

    const { getTrackProps, handles } = useRanger({
      min: 0,
      max: 90,
      stepSize: 30,
      values,
      onChange: setValues
    });

    const getProducts= async()=>{
        try {
            const result = await fetch ('http://localhost:4000/api/products');
            const prod = await result.json()
            console.log(prod)
            let productsToSend = [];
            if(values[0] >= 0 && values[0] < 30){
             productsToSend = prod.filter(prod=>( prod.type === "Hot" && prod.flavor === "Mild"))
            }
            else if(values[0] >= 30 && values[0] < 60){
                productsToSend = prod.filter(prod=>( prod.type === "Hot" && prod.flavor === "Medium"))
               }
                 else if(values[0] >= 60 && values[0] < 90){
                  productsToSend = prod.filter(prod=>( prod.type === "Hot"  && prod.flavor === "Hot"))
                  }
                  else if(values[0] === 90){
                    productsToSend = prod.filter(prod=>( prod.type === "Hot" && prod.flavor === "Blazing" ))
                    }
            setProducts(productsToSend)
            //second set is for a consistent access to all products not just the filtered ones for display (helps display cart)
          setAllProducts(prod)

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getProducts()
            .catch(console.error)
           
    }, [values]);
return(

<div>


<div className="Slider" style={{marginLeft:"25vw", width:"50vw"}}>
      <br />
      <br />
      <div
        {...getTrackProps({
          style: {
            height: "20px",
            background:" #ffbb00",
            background:"linear-gradient(to right, orange, red",
            boxShadow: "inset 0 .5px .5px red",
            borderRadius: "50px"
          }
        })}
      >
        {handles.map(({ getHandleProps }) => (
          <button
            {...getHandleProps({
              style: {
                width: "30px",
                height: "30px",
                outline: "none",
                borderRadius: "100%",
                background: "grey",
                boxShadow: "0px 0px 5px 5px orange",
   
              }
            })}
          />
        ))}
      </div>
      <br />
      <br />
      <br />
      <pre
        style={{
          display: "inline-block",
          textAlign: "left"
        }}
      >
      </pre>
    </div>
<div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
  {products.map((prod)=>{
        return(
          <Link to ={{
            pathname: "/products/hotshop"+`/${prod.id}`}} style={{textDecoration:"none", color:"grey"}} >
            <div  key={prod.id } style={{
             alignItems:"center",
              boxShadow:"rgba(0, 0, 0, 0.04) 0px 3px 5px",
            display:"flex", flexDirection: "column",marginTop:"4vw", justifyContent: "space-around", flexWrap:"wrap", width:"25vw", height:"25vw"}}>
              <img style={{height: "125px", width: "125px"}} src={prod.img} alt={prod.name}/>
                <p style={{fontWeight:"bolder", color:"black"}}>{prod.name}</p>
                <p > Heat Check: {values* .10 + 1}/10</p>
                <h3> ${prod.price} </h3>


                {/* <p style={{fontSize:"smaller"}}>{prod.description}</p> */}
                {/* <form>
                <button style={{fontFamily: ['Chivo', 'sans-serif'], background: "white", color: "black", border: ".5px solid grey"}} id = {prod.id} onClick={(event)=>{addToCart(event.target.id) }}>Add to Cart</button>
                <select style={{fontFamily: ['Chivo', 'sans-serif'], background: "white", color: "black", border: ".5px solid grey",   boxshadow: `0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)`}}
                onChange={(event)=>setQuantity(event.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
                 </form> */}
      
            </div>
            </Link>
        )})}
      </div>
        
        </div>

)
}
export default HotSauces