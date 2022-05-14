const client = require('../client');

async function getProductById(productsId) {
    try {
      const {
        rows: [products],
      } = await client.query(
        `
          SELECT *
          FROM products
          WHERE id=$1;
        `,
        [productsId]
      );     
      return products;
    } catch (error) {
      throw error;
    }
  }

  async function createProduct({ quantity, name, description, price }) {
    try {
      const {
        rows: [products],
      } = await client.query(
        `
          INSERT INTO products( quantity, name, description, price) 
          VALUES($1, $2, $3, $4) 
          RETURNING *;
        `,
        [quantity, name, description, price]
      );
      return products;
    } catch (error) {
      throw error;
    }
  }

  async function updateProduct({ id, quantity, name, description, price }) {
    
    try {
      const fields = {};
      if (name){
        fields.name = name
      }
      if (quantity){
        fields.quantity = quantity
      }
      if (description){
        fields.description = description
      }
      if (price){
        fields.price = price
      }
      
  
      const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
      ).join(', ');
  
      const {
        rows: [products],
      } = await client.query(
        `
          UPDATE products
          SET ${ setString }
          WHERE id=${id}
          RETURNING *
        `, Object.values(fields))
        return products;
    } catch (error) {
      throw error;
    }
  }

  async function getAllProducts() {
    try {
      const { rows } = await client.query(`
          SELECT id, quantity, name, description, price
          FROM products;
      `);
  
      return rows;
  }   catch (error) {
      throw error;
  }
  }

  async function deleteProduct(id) {
    try {
      const {rows:[product]} = await client.query(`
        DELETE FROM products
        WHERE "productsId"=$1
        RETURNING *
      `, [id]);
     
      return product;
    } catch (error) {
      throw error;
    }
  }

module.exports = {
    // add your database adapter fns here
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,    
    getProductById
  };