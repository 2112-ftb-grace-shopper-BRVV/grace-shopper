import React, { useState } from "react";

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
  <div >
    <form className="regform">
      
      <label>Username:</label>
      <input value={username} onChange={handleUserName} required />

      <label>Password:</label>
      <input value={password} onChange={handlePassword} required />

      <label>Confirm Password:</label>
      <input value={confirmPassword} onChange={handleReenterPassword} required/>

      <label>address:</label>
      <input value={address} onChange={handleAddress} required />

      <label>email:</label>
      <input value={email} onChange={handleEmail} required />   

      <button onClick={registerUser}>
        Register!
      </button>
    </form>
  </div>
  );
};

export default Register;