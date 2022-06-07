import React, { useEffect, useState } from "react"
import { useRanger } from "react-ranger";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Cart = ()=>{
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [quantity, setQuantity] = useState(1)
    let total = 0

    const getProducts= async()=>{
        try {
            const result = await fetch ('http://localhost:4000/api/products');
            const prod = await result.json()
            console.log(prod)
          setProducts(prod)

        } catch (error) {
            console.error(error)
        }
    }

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
        let i = products.filter(prod=> (prod.id === id))
        let image = i[0].img
        return image
    }
     function grabPrice(id, quantity){
        let i = products.filter(prod=> (prod.id === id))
        let price = i[0].price
         total += (price * quantity)
        return price
    }
     function grabName(id){
        let i = products.filter(prod=> (prod.id === id))
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
  console.log(id)
        try {
            await fetch(`http://localhost:4000/api/cartItem/${id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"},
     
            })
            let update = await getProducts()
            setProducts(update)
        } catch (error) {
            console.log(error)
            throw(error)
        }
  
    }
    async function updateQuantity(id, quantity){
        try {
            await fetch(`http://localhost:4000/api/cartItem/${id}`,{
                method: "PATCH",
                headers: {
                 "Content-Type": "application/json"},
                body: JSON.stringify({
                    quantity: quantity
                })
    
            })
          
        } catch (error) {
          console.log(error)
        }
      }
  
       async function getSubTotal(){
         console.log("im being hit")


       }

  
      useEffect(() => {
        getProducts()
            .catch(console.error)
        getUserCart()
        .catch(console.error)
                  
    }, []);
    
    return(<div>

<div style={{display:"flex", flexDirection:"column",  transition: "all .4s ease",  boxShadow: "10px 10px rgba(0,0,0,.15)",  borderRadius: "0% 0% 0% 0% / 0% 0% 0% 0% "}}>
        { cart ? cart.map((c =>{return(<div key={c.id} >
            
            <img style={{height: "75px", width: "75px"}} src={grabImage(c.productId)} alt={c.name}/>
           <p style={{color:"black"}}>{grabName(c.productId)}</p> 
           <p>Price: ${grabPrice(c.productId, c.quantity)}.00</p>
           <p>Quantity: {c.quantity}</p>
             <select defaultValue={ c.quantity} onChange={(event)=>updateQuantity(c.id, event.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
            
           
          
           <button style={{fontFamily: ['Chivo', 'sans-serif'], background: "white", color: "black", border: ".5px solid grey",  
            boxshadow: `0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)`}}  id = {c.productId} onClick={(event)=>{removeFromCart(event.target.id) }}>Remove</button>
      
        </div>)

        })
        
        )  : (<h1 style={{color:"grey"}}>YOUR CART IS EMPTY!</h1>)}
        <Link to = "cart/checkout">
         <button style={{ fontFamily: ['Chivo', 'sans-serif'], background: "white", color: "black", border: ".5px solid grey",  
         boxshadow: `0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)`}} >
          Check out
          </button></Link>
     <p style={{color:"black"}}>Subtotal: ${total}.00</p>
    </div>
    </div>)
    
    }
    export default Cart