const express = require('express');
const cartRouter = express.Router()

const {
 createUserCart,
    getUserCart
} = require('../db/models/userCart')

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

   
    const  { routineId } = req.params
    const { id, isPublic, name, goal} = req.body
    try { 

        const updatedCart = await createUserCart({id: routineId, isPublic, name, goal})

        res.send(updatedCart)
    }

    catch(error) {
        console.log(error);
        next(error);
      }
    });

    module.exports = cartRouter;