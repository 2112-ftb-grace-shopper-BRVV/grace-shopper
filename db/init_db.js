const { init } = require('express/lib/application');
const {
  client,
  // declare your model imports here
  // for example, User
  createUser, createProduct
} = require('./');


async function dropTables() {
  console.log('Dropping All Tables...');

  try {
    console.log('starting to drop tables')
   await client.query(`
    DROP TABLE IF EXISTS users cascade;
    DROP TABLE IF EXISTS products cascade;
    
    `)
    console.log("finished dropping tables!")
  } catch (error) {
    console.log('error dropping tables')
    throw error;
  }

}
//USER
//PRODUCT
async function buildTables() {
  try {
    // client.connect();
    console.log("starting to build tables")
    await client.query(`
    CREATE TABLE users( 
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      cardnumber INTEGER,
      ccv INTEGER,
      expiration INTEGER
      );
    CREATE TABLE products(
      id SERIAL PRIMARY KEY, 
      "creatorId" INTEGER REFERENCES users(id),
      quantity INTEGER NOT NULL,
      name VARCHAR(255) UNIQUE NOT NULL,
      description TEXT NOT NULL,
      price FLOAT NOT NULL
    );
    

    `)

//user cart commented out, waiting for usercart file

    // build tables in correct order
    //user cart test
    // CREATE TABLE userCart(
    //   id SERIAL PRIMARY KEY,
    // "userId" INTEGER REFERENCES users(id),
    // "productId" INTEGER REFERENCES products(id),
    // "productCount" INTEGER NOT NULL,
    // "paidFor" BOOLEAN DEFAULT false
    // );

  } catch (error) {
    console.log("error building tables")
    throw error;
  }
}
async function createInitialUsers(){
  console.log('Starting to create users');

  try {

    const usersToCreate=[
{username:'vinny', password:"123", address:'5725 s mcvicker', email:'vinnyzef@whatever.com'},
{username:'ryan', password:'456', address:'5725 s whatever', email:'ryanmail@ryan.com'}

    ]
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log('Users created:');
    console.log(users);
    console.log('Finished creating users!');
    return users;
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  } 
}
async function createInitialProducts (initialUsers){
  try {
   
    console.log((initialUsers))
    const productsToCreate =[
      //this code will be used in user cart let vinny(zef) mess with this 
      //he has a semi-alright idea of what hes gonna do with it

      //use this for cart userid reference 
      //creatorId: initialUsers[0].id,
      { quantity: 4 ,name: 'sauce',description:'saucy', price:1.24}]
      const products = await Promise.all(productsToCreate.map(createProduct));
    
   console.log('Products created:');
  console.log(products);
  console.log('Finished creating products!');
} catch (error) {
  console.error('Error creating products!');
  throw error;
} 
}
async function createInitialUserCarts (){
  try {
    const userCartToCreate =[
      {productCount:2}]
      const userCarts = await Promise.all(userCartToCreate.map(createUserCart));

    
   console.log('User Carts created:');
  console.log(userCarts);
  console.log('Finished creating carts!');
} catch (error) {
  console.error('Error creating carts!');
  throw error;
} 
}

async function populateInitialData() {
  try {    
    client.connect();
    await dropTables()
    await buildTables();
    const users = await createInitialUsers();
    await createInitialProducts(users);
  //commented out, also waiting for user cart file to be made.
    // await createInitialUserCarts();

    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  await  client.end()
  } catch (error) {
    console.error("error during population of data")
    throw error;
  }
}

populateInitialData();




