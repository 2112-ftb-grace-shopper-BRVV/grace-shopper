const express = require('express');
const productsRouter = express.Router()
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,    
    getProductById
   } = require('../db/models/products')

   productsRouter.get('/', async (req, res, next) => {
    
    console.log("This is the route for the products")

    try {
        const products = await getAllProducts()

        res.send(products)}

        catch(error) {
            console.log(error);
            
          }
        });


 productsRouter.post('/', async (req, res, next) => {

        try {

            const {quantity, name, description, price} = req.body
            
            const product = await createProduct({ quantity, name, description, price })
            res.send(product)
        } catch ({ name, message }) {
            next({ name, message })}
    
});
//problems testing this function!
productsRouter.patch('/:id', async (req, res, next) => {

    try {

        const {quantity, name, description, price} = req.body
        console.log(req.params.id)
        const product = await updateProduct({id: req.params.productId, quantity, name, description, price })
        res.send(product)
    } catch ({ name, message }) {
        next({ name, message })}

});
//problems testing this function!
productsRouter.delete('/:id', async(req,res,next)=>{
    try {
        //problem is in db 

      console.log(req.params.id)
        const product = await deleteProduct(req.params.id);
        console.log(product)
        res.send(product)
    } catch ({ name, message }) {
        next({ name, message })}
})

module.exports = productsRouter;