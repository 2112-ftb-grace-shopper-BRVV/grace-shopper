
const {
  client,
  // declare your model imports here
  // for example, User
  createUser, createProduct,createUserCart, getAllProducts, getAllUsers
} = require('./');
const { createCartItem } = require('./models/cartItem');




async function dropTables() {
  console.log('Dropping All Tables...');

  try {
    console.log('starting to drop tables')
   await client.query(`
    DROP TABLE IF EXISTS users cascade;
    DROP TABLE IF EXISTS products cascade;
    DROP TABLE IF EXISTS userCart cascade;
    DROP TABLE IF EXISTS cartitem cascade;
  
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
      "isAdmin" BOOLEAN DEFAULT false,
      cardnumber INTEGER,
      ccv INTEGER,
      expiration INTEGER
      );
    CREATE TABLE products(
      id SERIAL PRIMARY KEY, 
      "creatorId" INTEGER REFERENCES users(id),
      quantity INTEGER NOT NULL,
      name VARCHAR(255) UNIQUE NOT NULL,
      type VARCHAR(255) NOT NULL,
      flavor VARCHAR(255) NOT NULL,
      img VARCHAR(255),
      description TEXT NOT NULL,
      price FLOAT NOT NULL
    );
    
    CREATE TABLE userCart(
      id SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES users(id),
    "productId" INTEGER REFERENCES products(id),
    "productCount" INTEGER NOT NULL,
    "paidFor" BOOLEAN DEFAULT false
    );
    
    CREATE TABLE cartitem(
      id SERIAL PRIMARY KEY,
      "cartId" INTEGER REFERENCES userCart(id),
      "productId" INTEGER UNIQUE REFERENCES products(id),
      quantity INTEGER NOT NULL
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
{username:'vinny', password:"123", address:'5725 s mcvicker', email:'vinnyzef@whatever.com', id: 1, isAdmin: false},
{username:'ryan', password:'123', address:'5725 s whatever', email:'ryanmail@ryan.com', id: 2, isAdmin: false},
{username:'vinnyAdmin', password:"123", address:'5725 s mcvicker', email:'vinnyzef@whatever1.com', id: 3, isAdmin: true},
{username:'ryanAdmin', password:'123', address:'5725 s whatever', email:'ryanmail@ryan1.com', id: 4, isAdmin: true},
{username:'vin', password:"123", address:'5725 s mcvicker', email:'vinnyzef@whatever2.com', id: 5, isAdmin: false},
{username:'vinAdmin', password:"123", address:'5725 s mcvicker', email:'vinnyzef@whatever3.com', id: 6, isAdmin: true},
{username:'brianne', password:"123", address:'5725 s mcvicker', email:'vinnyzef@whatever4.com', id: 7, isAdmin: false},
{username:'brianneAdmin', password:"123", address:'5725 s mcvicker', email:'vinnyzef@whatever5.com', id: 8, isAdmin: true},

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

async function createInitialCartItem(){
try {
  const item = {cartId: 1, productId: 8, quantity: 2}
  const items = await createCartItem(item)
  

  
  console.log('Cart Items created:');
  console.log(items);
  console.log('Finished creating cart items!');
} catch (error) {
  console.error('Error creating cart items!');
  throw error;
} 
}

async function createInitialProducts (){
  try {
   
    const productsToCreate =[
      { quantity: 4 ,name: `Frank's Red Hot`,description:'Frank comes in with the classic hot sauce flavor and kick', price:1.24, type: "Hot", flavor:"Mild",img:"https://images.heb.com/is/image/HEBGrocery/001579673?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0", id: 1},
      { quantity: 4 ,name: 'Chili',description:'A smooth and flavorful but not too much heat', price:1.24, type: "Hot", flavor:"Sweet", img: "https://images.heb.com/is/image/HEBGrocery/001579673?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0", id: 1},
      { quantity: 4 ,name: 'Cajun',description:'A sauce with more boot than an NFL kicker, strap in for flavor and heat you have not seen before', price:1.24, type: "Hot", flavor:"Hot",img:"https://images.heb.com/is/image/HEBGrocery/001579673?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0", id: 1},
      { quantity: 4 ,name: 'Ghost Pepper',description:'Strap in and prepare for out of this world heat you cant escape', price:1.24, type: "Hot", flavor:"Blazing", img:"https://images.heb.com/is/image/HEBGrocery/001579673?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0",id: 1},
      { quantity: 4 ,name: `Sweet Baby Ray's`,description:'saucy', price:1.24, type: "BBQ", flavor:"Sweet",img:"https://images.heb.com/is/image/HEBGrocery/001579673?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0", id: 1},
      { quantity: 4 ,name: `Stubb's Tangy`,description:'saucy', price:1.24, type: "BBQ", flavor:"Tangy",img:"https://images.heb.com/is/image/HEBGrocery/001579673?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0", id: 1},
      { quantity: 4 ,name: 'G Hughes Hickory',description:'saucy', price:1.24, type: "BBQ", flavor:"Smoky",img:"https://images.heb.com/is/image/HEBGrocery/001579673?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0",id: 1},
      { quantity: 4 ,name: 'Heinz Carolina Vinegar',description:'saucy', price:1.24, type: "BBQ", flavor:"Spicy",img:"https://images.heb.com/is/image/HEBGrocery/001579673?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0", id: 1},
      { quantity: 4 ,name: `Famous Dave's Devil Spit`,description:'saucy', price:1.24, type: "BBQ", flavor:"Hot", img:"https://images.heb.com/is/image/HEBGrocery/001579673?fit=constrain,1&wid=800&hei=800&fmt=jpg&qlt=85,0&resMode=sharp2&op_usm=1.75,0.3,2,0", id: 1}]
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
   await createInitialCartItem();
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