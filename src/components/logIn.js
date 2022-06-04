import React, { useEffect, useState } from "react"

const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { isLoggedIn, setIsLoggedIn } = props

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
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsLoggedIn(false);
    };

    return (
        <>
            <div style={{ display: "flex", alignItems:"center" ,marginRight:"3vw",paddingLeft:"30vw"}}>
                {isLoggedIn ? (
                    <>
                        <button className="loginlogout" onClick={logOut}>Log Out</button>
                    </>
                ) : (
                    <>
                        <h3 style={{display:"flex",marginRight:"5px",justifyItems:"row",width:"120px"}}>Login Here!</h3>
                        <input style={{height:"30px",marginRight:"5px",fontSize:"large",width:"8vw"}}
                            placeholder="Username*"

                            onChange={(event) => setUsername(event.target.value)}
                        ></input>
                        <input style={{height:"30px",marginRight:"5px",fontSize:"large",width:"8vw"}}
                            placeholder="Password*"

                            onChange={(event) => setPassword(event.target.value)}
                        ></input>
                        <button className="loginlogout" onClick={logInUser}>Log In</button>                       
                    </>
                )}
            </div>            
        </>
    );

};

export default Login