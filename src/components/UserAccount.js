import { user } from "pg/lib/defaults";
import React, { useEffect, useState } from "react"

const UserAccount = () => {
const token = localStorage.getItem("token")
const [userInfo, setUserInfo] = useState({}) 
  
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
               <p>Address: {userInfo.address}</p> <button>Update Address</button>
                <p>Email: {userInfo.email}</p> <button>Update Email</button>
                
            </div>
            
        </div>

    )


}






export default UserAccount;