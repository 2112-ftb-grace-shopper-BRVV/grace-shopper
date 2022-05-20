
import React, { useEffect, useState } from "react"



const Products = () =>{
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [desc, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')


    const getProducts= async()=>{
        try {
            const result = await fetch ('http://localhost:4000/api/products');
            const prod = await result.json()
            console.log(prod)
            setProducts(prod)
            console.log(products)

        } catch (error) {
            console.error(error)
        }
    }
    const addProduct= async(event)=>{
        event.preventDefault()

        //wait for brianne and vinny to create user auth and add in header
        try {
           const result = await fetch ('http://localhost:4000/api/products',{
           method: "POST",
           headers: {
            "Content-Type": "application/json"},
           body: JSON.stringify({
            quantity: quantity,
               name: name,
               description: desc,
               price: price,
          
           })})
           const product = await result.json()
           console.log(product)
           setProducts([product,...products]);
        
        } catch (error) {
            console.error(error)
    
        }

    }
    const deleteProduct= async(id)=>{

        //wait for brianne and vinny to create user auth and add in header
        try {
      await fetch (`http://localhost:4000/api/products/${id}`,{
           method: "DELETE",
           headers: {
            "Content-Type": "application/json",

         }
           })
        getProducts()
        } catch (error) {
            console.error(error)
    
        }

    }
    useEffect(() => {
        getProducts()
            .catch(console.error)


    }, []);

    return(

<div>
    <form>
        Add new product:
        <input placeholder="name" onChange = {(event)=> {setName(event.target.value)}}></input>
        <input placeholder="description" onChange={(event)=> {setDescription(event.target.value)}}></input>
        <input placeholder="price" onChange={(event)=> {setPrice(event.target.value)}}></input>
        <input placeholder="quantity" onChange={(event)=> {setQuantity(event.target.value)}}></input>

        <button onClick={(event)=> addProduct(event)}>Create new product</button>
    </form>

    {products.map((prod)=>{
        return(
            <div key={prod.id}>
                <p>Name: {prod.name}</p>
                <p>Description: {prod.description}</p>
                <p>Price: {prod.price}</p>
                {/* <button id = {prod.id} onClick={(event)=>{updateProduct(event.target.id)}}>Update Product</button> */}
                <button id = {prod.id} onClick={(event)=>{deleteProduct(event.target.id) }}>Delete Product</button>
            </div>
        )})}

</div>
)

    
}
export default Products