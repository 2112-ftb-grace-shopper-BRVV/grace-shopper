const express = require('express');
const userRouter = express.Router()
const jwt = require('jsonwebtoken');

const {
    getAllUsers,
    createUser,
    updateUser,
    getUserByUsername,
    getUserById,
    getUser


} = require('../db/models/user')



// POST /users/register

userRouter.use((req, res, next) => {
    console.log("Sending a request  to /users route");
    next();
  });
  


  userRouter.post("/register", async (req, res, next) => {
    const { username, password, address, email } = req.body;
    try {
      if (password.length < 6) {

        console.log("password error line hit")
        return next({ name: "password too short", message: "Try again with longer password"})
      }      

      const user = await createUser({ username, password, address, email });
  
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_KEY
      );
  
      res.send({
        message: "Thanks for signing up. Have a great day",
        token,
        user,
      });
  
     
    } catch ({ name, message }) {
      next({ name, message });
    }
  });


//POST /users/login

userRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
 
    // request must have both



    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Please supply both a username and password"
      });
    }
  
    try {
      const user = await getUser({username, password});
      

      if (!user) {
        next({
            name: "Incorrect credentials",
            message: "Incorrect, try again"
          });
      
         } else {
        // create token & return to user
        console.log(process.env.JWT_KEY)
        const token = jwt.sign({ id: user.id, username: user.username  }, process.env.JWT_KEY);

        console.log("TOKEN IS:", token)

        res.send({ user, message: "you're logged in!", token });}

    
      
    } catch(error) {
      console.log(error);
      next(error);
    }
  });

  userRouter.get("/", async (req, res, next) => {    
    try {
        
      const allUsers = await getAllUsers();
        
      res.json(allUsers);
    } catch (error) {
      next(error);
    }
  });

  userRouter.get("/profile", async (req, res, next) => {
    const { username } = req.user
    try {
      const userInfo = await getUserByUsername(username);
      delete userInfo.password
      res.json(userInfo)
    } catch (error) {
      next(error);
    }    
  });

  userRouter.patch('/:id', async (req, res, next) => {

    try {
        const {username, email, address, isAdmin} = req.body
        console.log(req.params.id)
    
        const userInfo = await updateUser( req.params.id, {username, email, address, isAdmin })
        res.send(userInfo)
    } catch (error) {
        next(error)}

});

module.exports = userRouter
