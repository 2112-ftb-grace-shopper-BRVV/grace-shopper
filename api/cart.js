const express = require('express');
const cartRouter = express.Router()

const {
 createUserCart,
    getUserCart,
    deleteCart
} = require('../db/models/userCart');
const { requireUser } = require('./utils');

cartRouter.get('/:userId', async (req, res, next) => {
    const  { userId } = req.params
    console.log("This is the route for the cart")

    try {
        const userCart = await getUserCart(userId)



        res.send(userCart)}

        catch(error) {
            console.log(error);
            next(error);
          }
        });


//route for adding to cart, WORK IN PROGRESS
cartRouter.patch('/:userId', async (req, res, next) => {

   
    const  { userId } = req.params
    const { id, productId, productCount} = req.body
    try { 

        const updatedCart = await createUserCart({id: userId, productId, productCount})

        res.send(updatedCart)
    }

    catch(error) {
        console.log(error);
        next(error);
      }
    });
////////////////
    cartRouter.delete('/', async (req, res, next) => {
    
      const  { userId } = req.user
      try {
        const cart = await deleteCart({id: userId})
    console.log("tryna delete this cart")
        if (userId === req.userId) {
          const updatedCart = await createUserCart(userId);
    
          res.send(updatedCart);
        }
    
      } catch ({ name, message }) {
        next({ name, message })
      }
    });
  

    //need route for deleting one item, /':productId'
    module.exports = cartRouter;