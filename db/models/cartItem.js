const client = require('../client');


async function createCartItem({ cartId, productId, quantity}) {
    console.log("trying to create user cartitem with this stuff",{ cartId, productId, quantity})
    try {
        const { rows: [item] } = await client.query(`
        INSERT INTO cartitem ("cartId", "productId", quantity) 
        VALUES($1, $2, $3) 
        RETURNING *;
      `,[cartId, productId, quantity]) 

        return item
    } catch (error) {
        console.error(error)
      throw error;
    }
  }

  async function getCartItem() {
      
    try {
      const { rows: userCart } = await client.query(`
          SELECT * 
          FROM cartitem; 
          `);
      return await userCart;
    } catch (error) {
      console.error("Could not get the cart item");
      throw error;
    }
  }

 

  module.exports = {
      createCartItem,
      getCartItem
  }