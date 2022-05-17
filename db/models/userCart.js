const client = require('../client');

async function createUserCart({userId, productId, productCount}) {
    console.log("trying to create user cart with this stuff", userId, productId, productCount)
    try {
        const { rows: [userCart] } = await client.query(`
        INSERT INTO userCart("userId", "productId", "productCount") 
        VALUES($1, $2, $3) 
        RETURNING *;
    `, [userId, productId, productCount]);

      return userCart;
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
          WHERE "userId"=$1
          `,[userId]);
      return await userCart;
    } catch (err) {
      console.error("Could not get the user's cart");
      throw err;
    }
  }


  //add to cart - can be done with createUserCart, would want a route for this, a route to update cart, a rout to get cart

  //delete something from cart

  //maybe handle guest cart with local storage

  //a func to buy stuff, need route for this

  module.exports = {createUserCart, getUserCart};