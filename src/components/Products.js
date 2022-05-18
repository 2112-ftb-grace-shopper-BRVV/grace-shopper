
import React, { useEffect, useState } from "react"






const Products = () =>{
    const [products, setProducts] = useState([])

    const getProducts= async()=>{
        try {
            const result = await fetch ('http://localhost:4000/api/products');
            const prod = await result.json()
            console.log("poop")
            console.log(prod)
            setProducts(prod)
            console.log(products)

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

    {products.map((prod)=>{
        return(
            <div>
                <p>Name: {prod.name}</p>
                <p>Description: {prod.description}</p>
                <p>Price: {prod.price}</p>
                <button id = {prod.id}>Update Product</button>
            </div>
        )})}

</div>
)

    
}
export default Products