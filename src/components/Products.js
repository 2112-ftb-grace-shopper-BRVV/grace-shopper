
import React, { useEffect, useState } from "react"



const Products = () =>{
    const [products, setProducts] = useState([])
    const [name, setName] = useState('')
    const [desc, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [type, setType] = useState('')
    const [flavor, setFlavor] = useState('')
    const [img, setImg] = useState('')
    const [cart, setCart] = useState([])

    const getUserCart= async()=>{
    try {
        //change 2 to the current users id
        const result = await fetch(`http://localhost:4000/api/cart/2`)
        const json = await result.json()
        console.log(json)
        setCart(json)
    } 
    catch (error) {
        throw(error)
    
        }


    }
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
               type: type,
               flavor: flavor,
               img: img
          
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


    const updateProduct= async(id)=>{

        //wait for brianne and vinny to create user auth and add in header
        try {
     const result = await fetch (`http://localhost:4000/api/products/${id}`,{
            method: "PATCH",
            headers: {
             "Content-Type": "application/json"},
            body: JSON.stringify({
                quantity: quantity,
                name: name,
                description: desc,
                price: price,
                type: type,
                flavor:flavor,
                img:img
           
            })

        })
        const product = await result.json()

        } catch (error) {
            console.error(error)
    
        }

    }
    useEffect(() => {
        getProducts()
            .catch(console.error)
        getUserCart()
        .catch(console.error)

    }, []);
    return(

<div>

    <div style={{border: "solid 2px black"}}>
        <h2>Your Cart</h2>
        {cart.map((c=>{return(<div>
            <img style={{height: "100px", width: "100px"}} src={c.img} alt={c.name}/>
           <p>{c.name}</p> 
           <p>Price:{c.price}</p> 
           <p>Quantity:{c.productCount}</p> 
            <button>Check out</button>
        </div>)
        })
        
        )}
    </div>
    <form>
        Add new product:
        <input placeholder="name" onChange = {(event)=> {setName(event.target.value)}}></input>
        <input placeholder="description" onChange={(event)=> {setDescription(event.target.value)}}></input>
        <input placeholder="price" onChange={(event)=> {setPrice(event.target.value)}}></input>
        <input placeholder="quantity" onChange={(event)=> {setQuantity(event.target.value)}}></input>
        <input placeholder="type" onChange={(event)=> {setType(event.target.value)}}></input>
        <input placeholder="flavor" onChange={(event)=> {setFlavor(event.target.value)}}></input>
        <input placeholder="img" onChange={(event)=> {setImg(event.target.value)}}></input>
        <button onClick={(event)=> addProduct(event)}>Create new product</button>
    </form>

    {products.map((prod)=>{
        return(
            <div key={prod.id}>
              <img style={{height: "100px", width: "100px"}} src={prod.img} alt={prod.name}/>
                <p>Name: {prod.name}</p>
                <p>Description: {prod.description}</p>
                <p>Price: {prod.price}</p>
                <p>Type: {prod.type}</p>
                <p>Flavor: {prod.flavor}</p>
                {/* <button id = {prod.id} onClick={(event)=>{updateProduct(event.target.id)}}>Update Product</button> */}
                <button id = {prod.id} onClick={(event)=>{deleteProduct(event.target.id) }}>Delete Product</button>
                <form>
        <input placeholder="name" onChange = {(event)=> {setName(event.target.value)}}></input>
        <input placeholder="description" onChange={(event)=> {setDescription(event.target.value)}}></input>
        <input placeholder="price" onChange={(event)=> {setPrice(event.target.value)}}></input>
        <input placeholder="quantity" onChange={(event)=> {setQuantity(event.target.value)}}></input>

        <select onChange={(event)=> {setType(event.target.value)}}>
        <option defaultValue >Please choose type...</option>
        <option value="BBQ">BBQ</option>
        <option value="Hot">HOT</option>
        </select>  

        <select onChange={(event)=> {setFlavor(event.target.value)}}>
        <option defaultValue  >Please choose type...</option>
        <option value="Sweet">(Hot Sauce)Sweet</option>
        <option value="Mild">(Hot Sauce)Mild</option>
        <option value="Hot">(Hot Sauce)Hot</option>
        <option value="Blazing">(Hot Sauce)Blazing</option>
        <option value="Sweet">(BBQ Sauce)Sweet</option>
        <option value="Smoky">(BBQ Sauce)Smoky</option>
        <option value="Tangy">(BBQ Sauce)Tangy</option>
        <option value="Spicy">(BBQ Sauce)Spicy</option>
        <option value="Hot">(BBQ Sauce)Hot</option>
        </select>  
        <input placeholder="img" onChange={(event)=> {setImg(event.target.value)}}></input>
        <button id = {prod.id} onClick={(event)=>{updateProduct(event.target.id) }}>Update Product</button>
    </form>
 
            </div>
        )})}

</div>
)

    
}
export default Products