

import React, { useEffect, useState } from "react"
import { useRanger } from "react-ranger";

const HotSauces = ()=>{
    const [products, setProducts] = useState([])
    const [values, setValues] = useState([0]);

    const getProducts= async()=>{
        try {
            const result = await fetch ('http://localhost:4000/api/products');
            const prod = await result.json()
            console.log(prod)
            let productsToSend = [];
            if(values[0] >= 0 && values[0] < 30){
             productsToSend = prod.filter(prod=>( prod.type === "Hot" && prod.flavor === "Sweet"))
            }
            else if(values[0] >= 30 && values[0] < 60){
                productsToSend = prod.filter(prod=>( prod.type === "Hot" && prod.flavor === "Mild"))
               }
                 else if(values[0] >= 60 && values[0] < 90){
                  productsToSend = prod.filter(prod=>( prod.type === "Hot"  && prod.flavor === "Hot"))
                  }
                  else if(values[0] === 90){
                    productsToSend = prod.filter(prod=>( prod.type === "Hot" && prod.flavor === "Blazing" ))
                    }
            setProducts(productsToSend)


        } catch (error) {
            console.error(error)
        }
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


    }, [products]);
return(

<div>
<div className="Slider">
      <h2>Heat Scale</h2>
      <br />
      <br />
      <div
        {...getTrackProps({
          style: {
            height: "20px",
            background:" #ffbb00",
            background:"linear-gradient(to right, orange, red",
            boxShadow: "inset 0 1px 2px red",
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
                background: "black",
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
        <code>
          {JSON.stringify({
            values
            //if values is in (some range) it would be sweet mild spicy blah blah blah
          })}
        </code>
      </pre>
    </div>

{products.map((prod)=>{
        return(
            <div key={prod.id} style={{display:"flex", flexDirection: "row", justifyContent: "space-around"}}>
              <img style={{height: "100px", width: "100px"}} src={prod.img} alt={prod.name}/>
                <p>Name: {prod.name}</p>
                <p>Description: {prod.description}</p>
                <p>Price: {prod.price}</p>
                <p>Flavor: {prod.flavor}</p>
            </div>
        )})}</div>

)
}
export default HotSauces