const client = require('../client');



//use requierUser from utils on user specific functions
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

  async function createProduct({ quantity, name, description, price, type, flavor,img }) {
    try {
      const {
        rows: [products],
      } = await client.query(
        `
          INSERT INTO products( quantity, name, description, price, type, flavor,img) 
          VALUES($1, $2, $3, $4, $5, $6, $7) 
          RETURNING *;
        `,
        [quantity, name, description, price, type, flavor,img]
      );
      return products;
    } catch (error) {
      throw error;
    }
  }

  async function updateProduct({ id, quantity, name, description, price, type, flavor,img }) {
    
    try {

      const {
        rows: [products],
      } = await client.query(
        `
          UPDATE products
          SET quantity = $1, name = $2, description = $3, price = $4, type = $5, flavor = $6, img =$7
          WHERE id= ${id}
          RETURNING *;
        `,[quantity, name, description, price,type, flavor,img])
        console.log(products)
        return products;
    } catch (error) {
      throw error;
    }
  }

  async function getAllProducts() {
    try {
      const { rows } = await client.query(`
          SELECT id, quantity, name, description, price, type, flavor, img
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
        WHERE id = $1
        RETURNING *;
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