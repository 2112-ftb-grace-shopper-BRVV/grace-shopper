import React, { useEffect, useState } from "react";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [confirmPassword,setConfirmPassword] = useState(""); 
  const {setIsLoggedIn} = props

  const registerUser = async (event) => {
    event.preventDefault()    
    try{
    const response = await fetch("http://localhost:4000/api/user/register", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
           
                username: `${username}`,
                password: `${password}`,
                address: `${address}`,
                email: `${email}`,
                isAdmin: `${isAdmin}`                       
        })
    });
    const json = await response.json();
    console.log(json)
    const token = json.token
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setUsername("");
    setPassword("");
    setAddress("");
    setEmail("");
    setConfirmPassword("");

    return json;
    } catch (error){console.error(error, "Something's still wrong with registering the user!")}
} 

  

   useEffect(()=> {
    localStorage.getItem("token")
    

   }, [])  

    // if(password !== confirmPassword) {
    //   alert("Password does not match")
    // }
  
 
    const handleUserName = (event) => {
      setUsername(event.target.value);
    }
    const handlePassword = (event) => {
      setPassword(event.target.value);
    }
    const handleReenterPassword = (event) => {
      setConfirmPassword(event.target.value);
    }
    const handleAddress = (event) => {
      setAddress(event.target.value);
  
    } 

    const handleEmail = (event) => {
      setEmail(event.target.value);
    }
 
  return (
  <div style={{color:"lightgrey"}}>
    <form className="regform">
      
      <label className="reglabel">Username:</label>
      <input className="reginput" placeholder="Username*" value={username} onChange={handleUserName} required />

      <label className="reglabel" >Password:</label>
      <input className="reginput" placeholder="Password*" value={password} onChange={handlePassword} required />

      <label className="reglabel" >Confirm Password:</label>
      <input className="reginput" placeholder="Password Again*" value={confirmPassword} onChange={handleReenterPassword} required/>

      <label className="reglabel" >Shipping Address:</label>
      <input className="reginput" style={{width:"25vw"}} placeholder="Address*" value={address} onChange={handleAddress} required />

      <label className="reglabel" >Email:</label>
      <input className="reginput" placeholder="Email*" value={email} onChange={handleEmail} required />   

      <button className="regbutton" onClick={registerUser}>
        Register!
      </button>
    </form>
  </div>
  );
};

export default Register;