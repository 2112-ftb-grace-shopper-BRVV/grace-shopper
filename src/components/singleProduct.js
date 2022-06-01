import React, { useEffect, useState } from "react"


const SingleProduct = ()=>{
    const [product, setProducts] = useState([])

    const [cart, setCart] = useState([])

    const [quantity, setQuantity] = useState(1)


   async function getProd(id){
    try {
      const result = await fetch(`http://localhost:4000/api/products/11`)
      const prod= await result.json()
      console.log(prod)
      setProducts(prod)
        
    } catch (error) {
        console.log(error)
    }


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
   useEffect(() => {
    getProd()
        .catch(console.error)

              
}, []);
return(


<div>
    
            <div  key={product.id } style={{
             alignItems:"center",
              boxShadow:"rgba(0, 0, 0, 0.04) 0px 3px 5px",
            display:"flex", flexDirection: "column",marginTop:"4vw", justifyContent: "space-around", width:"50vw", height:"50vw"}}>
              <img style={{height: "30vw", width: "30vw"}} src={product.img} alt={product.name}/>
                <p style={{fontWeight:"bolder", color:"black"}}>{product.name}</p>
                <h3> ${product.price} </h3>


                <p style={{fontSize:"smaller"}}>{product.description}</p> 
                 <form>
                <button style={{fontFamily: ['Chivo', 'sans-serif'], background: "white", color: "black", border: ".5px solid grey"}} id = {product.id} onClick={(event)=>{addToCart(event.target.id) }}>Add to Cart</button>
                <select style={{fontFamily: ['Chivo', 'sans-serif'], background: "white", color: "black", border: ".5px solid grey",   boxshadow: `0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)`}}
                onChange={(event)=>setQuantity(event.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                </select>
                 </form>
      
            </div>

        





</div>



)




}
export default SingleProduct
