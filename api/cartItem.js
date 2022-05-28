const express = require('express');
const cartItemRouter = express.Router()

const {createCartItem, getCartItem} = require('../db/models/cartItem')


cartItemRouter.get('/', async (req, res, next) => {
    
    console.log("This is the route for cart items")

    try {
        const products = await getCartItem()

        res.send(products)}

        catch(error) {
            console.log(error);
            
          }
        });


 cartItemRouter.post('/', async (req, res, next) => {

        try {

            const { cartId, productId, quantity} = req.body
            
            const product = await createCartItem({ cartId, productId, quantity})
            res.send(product)
        } catch (error) {
            next()}
    
});
module.exports = cartItemRouter;