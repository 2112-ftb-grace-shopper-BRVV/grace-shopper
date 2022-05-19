import axios from 'axios';

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAPIHealth() {
  try {
    const { data } = await axios.get('/api/health');
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}





// export const logIn = async (username, password) => {
//   const url = `${baseUrl}/user/login`;
//   try{        
//   const response = await fetch(url, {
//       method: "POST",
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
          
//               username: `${username}`,
//               password: `${password}`
          
//       })
//   });    
//   console.log(response)

//   const json = await response.json();
//   console.log(json)
//   localStorage.setItem("token", json.token);
//   localStorage.setItem("username", username)
//   return json;
//   } catch (error){
//       console.log("banananananan")
//       console.error(error, "Username or Password is incorrect.")}
// }