const express = require('express');
const cartRouter = express.Router()

const {
 createUserCart,
    getUserCart,
    getUserCartById,
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
    
      const  { userCartId } = req.body
      const {userId} = req.user 
      const cartToDelete = await getUserCartById(userCartId)
      try {
        if (userId === cartToDelete.userId) {
          console.log("deleting the cart now")
        const cart = await deleteCart(userCartId)
        console.log(cart)
    console.log("tryna delete this cart")
       console.log("help i put my driver's license in my mahogany teakwood bath and bodyworks candle")
          const updatedCart = await createUserCart(userId);
    console.log(updatedCart)
          res.send(updatedCart);
        }
    
      } catch ( error ) {
        next( error )
      }
    });
  

    //need route for deleting one item, /':productId'
    module.exports = cartRouter;