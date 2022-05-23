const client = require('../client');
const { getProductById } = require('./products');

async function createUserCart({userId, productId, productCount}) {
    console.log("trying to create user cart with this stuff", userId, productId, productCount)
    try {
        const { rows: [userCart] } = await client.query(`
        INSERT INTO userCart("userId", "productId", "productCount") 
        VALUES($1, $2, $3) 
        RETURNING *;
    `, [userId, productId, productCount]);
      const newProduct = await getProductById(productId)
      delete newProduct.id //if you don't delete all cart items will have same ID
      console.log(newProduct)

      return {...userCart, ...newProduct};
    } catch (error) {
      throw error;
    }
  }

  async function getUserCart(userId) {
      
    try {
      const { rows: userCart } = await client.query(`
          SELECT * 
          FROM usercart
          JOIN products on usercart."productId" = products.id
          WHERE "userId"=$1 AND "paidFor"=false
          `,[userId]);
      return await userCart;
    } catch (err) {
      console.error("Could not get the user's cart");
      throw err;
    }
  }

  async function deleteCart(userId) {
    try {
      const {
        rows: [userCart],
      } = await client.query(`
      DELETE FROM userCart("userId", "productId", "productCount") 
      WHERE "userId"=${userId} AND "paidFor"=false  
      RETURNING *;
      `);
      return userCart;
    } catch (err) {
      console.error("Can't delete cart, bro I dunno what's wrong");
      throw err;
    }
  }


  //delete just one item
  async function deleteProductFromCart(userId,productId) {
    try {
      const {
        rows: [userCart],
      } = await client.query(`
      DELETE FROM userCart("userId", "productId", "productCount") 
      WHERE "userId"=${userId} AND "paidFor"=false AND "productId"=${productId}
      RETURNING *;
      `);
      return userCart;
    } catch (err) {
      console.error("Can't delete cart, bro I dunno what's wrong");
      throw err;
    }
  }
  
  //add a function to adjust quantity
  

  //add to cart - can be done with createUserCart, would want a route for this, a route to update cart, a rout to get cart

  //delete something from cart

  //maybe handle guest cart with local storage

  //a func to buy stuff, need route for this

  module.exports = {createUserCart, getUserCart, deleteCart};