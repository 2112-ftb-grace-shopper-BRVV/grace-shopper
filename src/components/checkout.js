import React, { useEffect, useState } from "react"
import { useRanger } from "react-ranger";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Checkout = ()=>{
return(



<div>

<form style={{display:'flex', flexDirection:"column"}}>
CARD NUMBER:
  <input placeholder="ex: XXXX-XXXX-XXXX-1234"></input>
  EXP DATE:
  <input placeholder="ex: 00/00"></input>
CVV:
  <input placeholder="ex: 123"></input>
<button>pay now</button>
</form>


</div>)




}
export default Checkout