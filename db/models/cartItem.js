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

  async function deleteCartItem(id){

    try {
        const{rows: cartItem} = await client.query(`
        UPDATE cartItem
         SET "cartId" = 0
          WHERE "productId" = $1 
          RETURNING *;`, [id]
        )
        return cartItem
    } catch (error) {
        console.log(error)
        throw(error)
    }}


async function updateCartItem(id, fields = {}){
   

  const setString = Object.keys(fields).map(
 (key, index) => `"${ key }"=$${ index + 1}`).join(', ');
          
  if (setString.length === 0) {
     return;
      }
          
     try {
         const { rows: [ user ] } = await client.query(`
           UPDATE cartItem
           SET ${ setString }
           WHERE id=${ id }
           RETURNING *;
                `, Object.values(fields));}
                catch(error){
                    console.log(error)
                }
        }
  

 

  module.exports = {
      createCartItem,
      getCartItem,
      deleteCartItem,
      updateCartItem
  }