import { rows } from "pg/lib/defaults";
import React, { useEffect, useState } from "react"


const BBQsauces = ()=>{
    const [products, setProducts] = useState([])
    const getProducts= async()=>{
        try {
            const result = await fetch ('http://localhost:4000/api/products');
            const prod = await result.json()
            console.log(prod)
            setProducts(prod.filter(prod=> prod.type === "BBQ"))
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
            <div key={prod.id} style={{display:"flex", flexDirection: "row", justifyContent: "space-around"}}>
                <p>Name: {prod.name}</p>
                <p>Description: {prod.description}</p>
                <p>Price: {prod.price}</p>
                <p>Flavor: {prod.flavor}</p>
            </div>
        )})}</div>

)
}
export default BBQsauces