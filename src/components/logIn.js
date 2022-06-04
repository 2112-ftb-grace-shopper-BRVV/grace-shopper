import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import { getUser } from "../axios-services";




const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { isLoggedIn, setIsLoggedIn} = props

    

    const logInUser = async (event) => {
        event.preventDefault()

console.log(username + "AND" + password)
        try {
            const response = await fetch('http://localhost:4000/api/user/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({

                    username: username,
                    password: password

                })
            });
            console.log(response)

            const json = await response.json();
            console.log(json)
            localStorage.setItem("token", json.token);
            localStorage.setItem("username", username)
            setIsLoggedIn(true);
            return json;
        } catch (error) {
            console.log("banananananan")
            console.error(error, "Username or Password is incorrect.")
        }
    }




const logOut = (event) => {
    event.preventDefault()

console.log(isLoggedIn)


    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
};

console.log(isLoggedIn)
return (
    <>
        <div style={{ display: "flex", alignItems: "center" }}>
            {isLoggedIn ? (
                <>
                    <button  style={{color:"gray"}}onClick={logOut}>Log Out</button>
                </>
            ) : (
                <>
                    <h3>Log In</h3>
                    <input
                        placeholder="Username*"
                        
                        onChange={(event) => setUsername(event.target.value)}
                    ></input>
                    <input
                        placeholder="Password*"
                        
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                    <button onClick={logInUser}>Log In</button>
                    {/* {errorMessages.length ? errorMessages.map((error) => error) : null} */}
                    {/* <button onClick={logOut}>logOut!</button> */}
                </>
            )}
        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "250px" }}>
         {/* OR Register for an account. */}
        </div>

    </>
);

    };

















export default Login