const express = require('express');
const { deleteCart } = require('../db');
const cartItemRouter = express.Router()

const {createCartItem, getCartItem, deleteCartItem, updateCartItem} = require('../db/models/cartItem')


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
cartItemRouter.patch('/:cartItemId', async (req, res, next) => {

    try {

        const {fields} = req.body
        
        const product = await updateCartItem(cartItemId, fields)
        res.send(product)
    } catch (error) {
        next()}

});
cartItemRouter.delete('/:cartItemId', async (req,res,next)=>{
    try {
        const {cartItemId} = req.params;
        const product = await deleteCartItem(cartItemId)
        res.send(product)
        
    } catch (error) {
        console.error(error)
        throw error
    }

    



})
module.exports = cartItemRouter;