const express = require('express');
const productsRouter = express.Router()
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,    
    getProductById
   } = require('../db/models/products')
   const {requireUser} = require('./utils')

   productsRouter.get('/', async (req, res, next) => {
    
    console.log("This is the route for the products")

    try {
        const products = await getAllProducts()

        res.send(products)}

        catch(error) {
            console.log(error);
            
          }
        });

        productsRouter.get('/:prodId', async (req, res, next) => {
    
            console.log("This is the route for the products")
            const {prodId} = req.params;
            try {
                const product = await getProductById(prodId)
        
                res.send(product)}
        
                catch(error) {
                    console.log(error);
                    
                  }
                });


 productsRouter.post('/', async (req, res, next) => {

        try {

            const {quantity, name, description, price} = req.body
            
            const product = await createProduct({ quantity, name, description, price, type, flavor, img })
            res.send(product)
        } catch ({ name, message }) {
            next({ name, message })}
    
});
//problems testing this function!
productsRouter.patch('/:id', async (req, res, next) => {

    try {
        const {quantity, name, description, price, type, flavor} = req.body
        console.log(req.params.id)
        const product = await updateProduct({id: req.params.id, quantity, name, description, price, type, flavor,img })
        res.send(product)
    } catch (error) {
        next(error)}

});

productsRouter.delete('/:id', async(req,res,next)=>{
    try {


      console.log(req.params.id)
        const product = await deleteProduct(req.params.id);
        console.log(product)
        res.send(product)
    } catch ( error) {
        next( error)}
})

module.exports = productsRouter;