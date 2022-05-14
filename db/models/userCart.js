const client = require('../client');

async function createUserCart(userId, productId, {prodCount}) {
    // console.log(userId, productId, prodCount)
    try {
        const { rows: [userCart] } = await client.query(`
        INSERT INTO userCart("userId", "productId", "productCount") 
        VALUES($1, $2, $3) 
        RETURNING *;
    `, [userId, productId, prodCount]);

      return userCart;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {createUserCart,};