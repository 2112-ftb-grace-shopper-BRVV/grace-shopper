import { user } from "pg/lib/defaults";
import React, { useEffect, useState } from "react"

const UserAccount = () => {
const token = localStorage.getItem("token")
const [userInfo, setUserInfo] = useState({}) 
const [username, setUsername] = useState("") 
const [shippingAddress, setShippingAddress] = useState("") 
const [email, setEmail] = useState("") 

console.log(`this is our current user data: ${username}, ${shippingAddress}, ${email}`)
const updateInfo= async(id)=>{

        try {
        const result = await fetch (`http://localhost:4000/api/user/${id}`,{
            method: "PATCH",
            headers: {
            "Content-Type": "application/json"},
            body: JSON.stringify({
                username: username,
                address: shippingAddress,
                email: email
       
            })

        })
        const updatedUser = await result.json()

        } catch (error) {
            console.error(error)

        }

}

    useEffect( async () => {
        
            try {
        const response = await fetch('http://localhost:4000/api/user/profile', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }            
        });
        console.log(response)

        const json = await response.json();
        console.log(json)       
        setUserInfo(json)
    } catch (error) {        
        console.error(error, "Something went wrong")
    }
    }, []);



    return (
        <div>
            <h1>Welcome to your profile page, {userInfo.username}!</h1>
            <div>
                <form>
                    <div>
                        <input placeholder={userInfo.username} onChange = {(event)=> {setUsername(event.target.value)}}></input>
                        <p>Username: {userInfo.username}</p> 
                    </div>
                    <div>
                        <input placeholder={userInfo.address} onChange={(event)=> {setShippingAddress(event.target.value)}}></input>
                        <p>Shipping Address: {userInfo.address}</p> 
                    </div>
                    <div>
                        <input placeholder={userInfo.email} onChange={(event)=> {setEmail(event.target.value)}}></input>
                        <p>Email: {userInfo.email}</p> 
                    </div>
                    <button id = {userInfo.id} onClick={(event)=>{updateInfo(event.target.id) }}>Update Info</button>
                </form>
                
               
                
                
            </div>
            
        </div>

    )


}






export default UserAccount;