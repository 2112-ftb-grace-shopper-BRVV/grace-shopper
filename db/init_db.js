
const {
  client,
  // declare your model imports here
  // for example, User
  createUser, createProduct,createUserCart, getAllProducts, getAllUsers
} = require('./');




async function dropTables() {
  console.log('Dropping All Tables...');

  try {
    console.log('starting to drop tables')
   await client.query(`
    DROP TABLE IF EXISTS users cascade;
    DROP TABLE IF EXISTS products cascade;
    DROP TABLE IF EXISTS userCart cascade;
    
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
    
    CREATE TABLE userCart(
      id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id),
    "productId" INTEGER REFERENCES products(id),
    "productCount" INTEGER NOT NULL,
    "paidFor" BOOLEAN DEFAULT false
    );`)

  } catch (error) {
    console.log("error building tables")
    throw error;
  }
}
async function createInitialUsers(){
  console.log('Starting to create users');

  try {

    const usersToCreate=[
{username:'vinny', password:"123", address:'5725 s mcvicker', email:'vinnyzef@whatever.com', id: 1},
{username:'ryan', password:'456', address:'5725 s whatever', email:'ryanmail@ryan.com', id: 2}

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


async function createInitialProducts (){
  try {
   
    const productsToCreate =[
      { quantity: 4 ,name: 'sauce',description:'saucy', price:1.24, id: 1}]
      const products = await Promise.all(productsToCreate.map(createProduct));
    
   console.log('Products created:');
  console.log(products);
  console.log('Finished creating products!');
} catch (error) {
  console.error('Error creating products!');
  throw error;
} 
}
async function createInitialUserCarts (initialUsers, inititalProd){
  try {
    console.log("Does this even work?")
    console.log(initialUsers.id)
    console.log(inititalProd.id)


      //use this for cart userid reference 
      //creatorId: initialUsers[0].id,
      
    const userCartToCreate =[
      {productCount:2, userId: initialUsers.id, productId: inititalProd.id}]
      console.log("Here is the cart we're trying to make:", userCartToCreate)
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
    await createInitialUsers()
    await createInitialProducts()
    const users = await getAllUsers();
    const products = await getAllProducts();
    console.log(users)
    console.log(products)
    
   await createInitialUserCarts( users[1], products[0]);
  //commented out, also waiting for user cart file to be made.


    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  await  client.end()
  } catch (error) {
    console.error("error during population of data, that sucks bro")
    throw error;
  }
}

populateInitialData();