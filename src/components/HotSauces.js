

import React, { useEffect, useState } from "react"
import { useRanger } from "react-ranger";
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

    const getUserCart= async()=>{
      try {
          //change 2 to the current users id
          const result = await fetch(`http://localhost:4000/api/cart/2`)
          const json = await result.json()
          console.log(json)
          setCart(json)
          getSubTotal()
      } 
      catch (error) {
          throw(error)
      
          }
  
  
      }
    function grabImage(id){
      let i = allProducts.filter(prod=> (prod.id === id))
      let image = i[0].img
      return image
  }
  function grabPrice(id, quantity){
      let i = allProducts.filter(prod=> (prod.id === id))
      let price = i[0].price

      return price
  }
  function grabName(id){
      let i = allProducts.filter(prod=> (prod.id === id))
      let name = i[0].name
      return name
  }

    const addToCart = async(prodId) =>{


      try {

          await fetch(`http://localhost:4000/api/cartItem`,{
          method: "POST",
          headers: {
              "Content-Type": "application/json"},
             body: JSON.stringify({
              cartId: 1,
              productId: prodId,
              quantity: quantity

          })})
      } catch (error) {
          console.log(error)
          throw error
      }


  }
  async function removeFromCart(id){

      try {
          await fetch(`http://localhost:4000/api/cartItem/${id}`,{
              method: "DELETE",
              headers: {
                  "Content-Type": "application/json"},
   
          })
      } catch (error) {
          console.log(error)
          throw(error)
      }

  }

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
    async function updateQuantity(quantity){
      try {
        
        
      } catch (error) {
        
      }
    }

     function getSubTotal(){
       console.log("im being hit")
     }
        //destructure react ranger
        const { getTrackProps, handles } = useRanger({
          min: 0,
          max: 90,
          stepSize: 30,
          values,
          onChange: setValues
        });

    useEffect(() => {
        getProducts()
            .catch(console.error)

        getUserCart()
        .catch(console.error)

                  
    }, [values]);
return(

<div>

<div style={{border: "dotted 1px black"}}>
        <h2 style={{color:"black"}}>Your Cart</h2>
        {cart.map((c =>{return(<div key={c.id} >
            <img style={{height: "75px", width: "75px"}} src={grabImage(c.productId)} alt={c.name}/>
           <p style={{color:"black"}}>{grabName(c.productId)}</p> 
           <p>${grabPrice(c.productId, c.quantity) * c.quantity+".00"}</p> 
           <p>Quantity:
           <select defaultValue={ c.quantity} onChange={(event)=>updateQuantity(event.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
           </p> 
           
          
           <button style={{fontFamily: ['Chivo', 'sans-serif'], background: "white", color: "black", border: ".5px solid grey",  
            boxshadow: `0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)`}}  id = {c.id} onClick={(event)=>{removeFromCart(event.target.id) }}>Remove from Cart</button>
     
        </div>)

        })
  
        )}
     <button style={{ fontFamily: ['Chivo', 'sans-serif'], background: "white", color: "black", border: ".5px solid grey",  
      boxshadow: `0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)`}} >Check out</button>
     <p style={{color:"black"}}>Subtotal: $33.00</p>
    </div>

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
          <Link style={{textDecoration:"none", color:"grey"}}to ="/products/singleProduct">
            <div  key={prod.id } style={{
             alignItems:"center",
              boxShadow:"rgba(0, 0, 0, 0.04) 0px 3px 5px",
            display:"flex", flexDirection: "column",marginTop:"4vw", justifyContent: "space-around", flexWrap:"wrap", width:"25vw", height:"25vw"}}>
              <img style={{height: "125px", width: "125px"}} src={prod.img} alt={prod.name}/>
                <p style={{fontWeight:"bolder", color:"black"}}>{prod.name}</p>
                <p> Heat Check: {values* .10 + 1}/10</p>
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