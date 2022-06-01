
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
      { quantity: 4 ,name: `The Classic | Hot Ones Hot Sauce`,description:`The #1 sauce on Hot Ones! When it came time for Hot Ones's to craft the perfect kick-off to Sean's spicy conversations, they knew they wanted a hot sauce that was as timeless as the chicken wing. `, price:10.00, type: "Hot", flavor:"Mild",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/theclassic1_1024x1024.jpg?v=1628208766", id: 1},
      { quantity: 4 ,name: `Bliss and Vinegar Hot Sauce | Yellowbird`,description:`A truly unique and tangy mild hot sauce. Tart vinegar adds bite, strawberries and dates add sweetness, serranos bring mild heat and coconut gives it all a dreamy texture. The tiniest hint of cinnamon makes you go back for more. A must have on roasted sweet potatoes, chicken, sandwiches or a charcuterie board.`, price:11.00, type: "Hot", flavor:"Mild",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/hotones-yellowbird-hotsauce_1024x1024.jpg?v=1631223156", id: 1},
      { quantity: 4 ,name: `Hot Ones Jr. The Yellow | Hot Ones Hot Sauce`,description:`The Yellow is a juicy mix of tropical pineapple, mango and just a few Scotch Bonnet peppers. Try it on sandwiches, rotisserie chicken, quesadillas, fish sticks and make snack time as fun as summer vacation! `, price:10.00, type: "Hot", flavor:"Mild",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/hotones-theyellow-hotsauce_1024x1024.jpg?v=1650308626", id: 1},
      { quantity: 4 ,name: `Jala Pepa Mild Hot Sauce | Savir Foods`,description:`Savir Foods chef Josue Rivas focuses on fresh, veggie-forward food, and this hot sauce is no exception. Jala Pepa was inspired by his favorite herby Peruvian dish. A new must-have for cilantro lovers, the grassy notes blend with jalapenos and golden aji amarillo peppers.`, price:10.00, type: "Hot", flavor:"Mild",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/Jalapepa_1024x1024.jpg?v=1628213257", id: 1},
      { quantity: 4 ,name: `Dustin Poirier's Louisiana Style Hot Sauce`,description:`Dustin Poirier is bringing the heat! The UFC fan favorite has partnered with Heartbeat Hot Sauce to create Poirier’s Louisiana Style, a hot sauce ode to his Lafayette, Louisiana roots. Like any good cajun sauce, the recipe starts with the best cayenne peppers, fermented to round out the sting and up the flavor before finishing with vinegar, sea salt, celery and garlic. `, price:12.00, type: "Hot", flavor:"Mild",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/poirier1_1024x1024.jpg?v=1628212700", id: 1},
      { quantity: 4 ,name: `HEATONIST No. Seven Hot Sauce | Angry Goat Pepper Co`,description:`Lucky number seven! Celebrate the seventh anniversary of our Brooklyn shop opening with this one-of-a-kind hot sauce featuring ancient ingredients remixed in a modern way. The first taste is sour from tart pomegranate and lemon. Then subtle earthiness from beets and peppery caraway transitions into lingering nutty afternotes of pistachio and mild serrano heat.`, price:12.00, type: "Hot", flavor:"Mild",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/HEATONIST7-2_1024x1024.jpg?v=1649819185", id: 1},
      { quantity: 4 ,name: `Hippy Dippy Green Hot Sauce | Angry Goat Pepper Co`,description:`ngry Goat Pepper Co's Hippy Dippy Green delivers a creamy texture thanks to the mix of avocado and olive oil. Kiwi fruit brings just enough sweetness to balance the jalapeños and serranos, while lime juice brightens up the roasted tomatillos. Great for tacos, salads, sandwiches, and especially chicken!`, price:11.00, type: "Hot", flavor:"Mild",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/8190561419362_1024x1024.jpg?v=1628200144", id: 1},
      { quantity: 4 ,name: `The Bronx Green Mild Hot Sauce | Small Axe Peppers`,description:`A collaboration between Small Axe Peppers and GrowNYC, and help from The New York Botanical Garden, The Bronx Hot Sauce is made with serrano peppers grown in community gardens around the borough. Rounded out with garlic, onion, and a nice relish consistency, this sauce is perfect for hamburgers, sandwiches, and fish.`, price:11.00, type: "Hot", flavor:"Mild",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/3652654825588_1024x1024.jpg?v=1628214524", id: 1},
      { quantity: 4 ,name: `Pineapple & Habanero Hot Sauce | Bravado Spice Co`,description:`Fresh pineapple dominates this sauce, shining through the habanero heat. Yellow bell pepper lends only a touch of sweetness. A great option for people who like fruit sauces but not overly sweet ones. Goes well with rice & beans, fish dishes, or mixed into a salad dressing.`, price:12.00, type: "Hot", flavor:"Mild",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/880526524425_1024x1024.jpg?v=1628200986", id: 1},
      { quantity: 4 ,name: `Chicago Red Hot Jalapeno Hot Sauce | Small Axe Peppers`,description:`The team at Small Axe managed to capture the flavors of the iconic Chicago Dog in this mild jalapeno sauce made from peppers grown in community gardens. Celery seed, dill, and briny apple cider vinegar evoke the classic pickle, while yellow mustard, tomatoes, and onion beg to be paired with an all-beef frank.`, price:15.00, type: "Hot", flavor:"Mild",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/Chicago_1024x1024.jpg?v=1628213952", id: 1},
      { quantity: 4 ,name: `Paddy O's Potion Hot Sauce | Popp Sauce`,description:`Paddy's O's Potion fantastically bright sauce has a vinegar base with grapefruit to bring on the tang! Garlic is high on the list but is rounded out with the sunflower seed oil and a hint of sweet carrot. Toss directly on seafood, add to butternut squash soup, or zest up your salad. `, price:10.00, type: "Hot", flavor:"Mild",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/1047343890441_1024x1024.jpg?v=1628212789", id: 1},
      { quantity: 4 ,name: `Danny Wood's Jalapeno Cilantro Hot Sauce | Torchbearer Sauces`,description:`He’s a singer, songwriter, actor and producer. Now New Kids on the Block’s Danny Wood has a new claim to fame: an awesome hot sauce. Made in partnership with the crew at Torchbearer Sauces, Danny Wood’s Jalapeno Cilantro is a smooth operating crooner of a hot sauce with mild mannered jalapeno, tons of addicting garlic and refreshing base notes of cilantro.`, price:10.00, type: "Hot", flavor:"Mild",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/DANNYWOODS-JALAPENOCILANTRO-HOTSAUCE_1024x1024.jpg?v=1629313767", id: 1},
      { quantity: 4 ,name: `California Raisin Hot Sauce | Small Axe Peppers`,description:`Oakland California Raisin honors beautiful local ingredients from the newest community gardens in Small Axe Pepper Co’s network. Sourcing jalapenos and serranos grown across Oakland, Small Axe blends them with another classic California export, sun-dried raisins.`, price:10.00, type: "Hot", flavor:"Mild",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/Caliraisin1_1024x1024.jpg?v=1628213902", id: 1},
      { quantity: 4 ,name: `Guajillo & Red Jalapeno Hot Sauce | Humble House`,description:`This sauce from the San Antonio kitchen of Humble House is a well balanced red jalapeño and fresh garlic masterpiece. The guajillo peppers add a nice sweet touch to this south of the border Sriracha, landing at a solid mild heat level.`, price:9.00, type: "Hot", flavor:"Mild",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/838886555657_1024x1024.jpg?v=1628209554", id: 1},
      { quantity: 4 ,name: `Original Hot Sauce | Howler Monkey`,description:`Howler Monkey Original is a nod to the traditional Panamanian-style hot sauce with a tangy vinegar base and scotch bonnet peppers. Turmeric and garlic are stand-out flavors, making this every-day use sauce truly original. Try it on everything, from eggs to chicken to salads.`, price:11.00, type: "Hot", flavor:"Mild",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/2522930348148_1024x1024.jpg?v=1628209450", id: 1},
      

      { quantity: 4 ,name: '.718 Hot Sauce | Señor Lechuga',description:`Hailing from HEATONIST’s hometown of Brooklyn, New York, Señor Lechuga mixes high-quality, craft ingredients with unique chilis for big flavor and nuanced heat. `, price:14.00, type: "Hot", flavor:"Medium", img: "https://cdn.shopify.com/s/files/1/2086/9287/products/hotones-senorlechuga-hotsauce_1024x1024.jpg?v=1631223130", id: 1},
      { quantity: 4 ,name: 'The Original Goat (The OG) Hot Sauce | Ginger Goat',description:`Ginger hot sauce! Need we say more? Ginger Goat lives up to its name with a billy goat kick of zippy, throat-clearing ginger root that is perfectly balanced with bright, tropical smoked pineapple. Slow building heat from just a handful of Carolina Reapers in each batch add a tingle at the back of the throat. `, price:12.00, type: "Hot", flavor:"Medium", img: "https://cdn.shopify.com/s/files/1/2086/9287/products/Gingergoat_1024x1024.jpg?v=1622751538", id: 1},
      { quantity: 4 ,name: 'The Phoenix Hot Sauce | Angry Goat Pepper Co',description:`Phoenix marks their return to the lineup with another one-of-a-kind recipe, this time with cantaloupe and ginger. Yes, you read that right… melon on chicken wings. It may seem strange at first, but to all the skeptics out there we say, “Don’t knock it ‘til you’ve tried it!” This sauce is sweet-tart heat and downright addicting on salad, sandwiches or even with a charcuterie board. `, price:12.00, type: "Hot", flavor:"Medium", img: "https://cdn.shopify.com/s/files/1/2086/9287/products/ANGRYGOATTHEPHOENIX_b27a4a5e-993c-4d58-8eda-097075368009_1024x1024.jpg?v=1641842884", id: 1},
      { quantity: 4 ,name: 'Tears of the Sun Private Reserve Hot Sauce | High River Sauces',description:`High River maker Steve Seabury created this private reserve version with guitarist Chris Caffery of Trans-Siberian Orchestra. A sunshiny mix of mangos, papaya, peaches and pineapple blends perfectly with the bright, citrusy notes of Peach Ghost-Scorpion peppers, which give this sauce its instant, building heat.`, price:11.00, type: "Hot", flavor:"Medium", img: "https://cdn.shopify.com/s/files/1/2086/9287/products/TEARS_1024x1024.jpg?v=1616536993", id: 1},
      { quantity: 4 ,name: 'Habanero Hot Sauce | Secret Aardvark Trading Co',description:`Portland's famous table sauce, Secret Aardvark Habanero's unique Caribbean / Tex-Mex hybrid is made with flavorful Habanero peppers and roasted tomatoes. You'll want to use it on everything, so be careful if you only get one bottle.`, price:10.00, type: "Hot", flavor:"Medium", img: "https://cdn.shopify.com/s/files/1/2086/9287/products/460749635593_1024x1024.jpg?v=1628213474", id: 1},
      { quantity: 4 ,name: 'Habanero Hot Sauce | Heartbeat Hot Sauce',description:`Made with bell pepper and fermented red habanero peppers, this vinegar-based hot sauce is a perfect combo of savory and spicy. With hints of garlic and lime, this universal hot sauce is perfect for breakfast, lunch and dinner. And its easy squeeze bottle lets you control just how much or little (we recommend much) you add.`, price:14.00, type: "Hot", flavor:"Medium", img: "https://cdn.shopify.com/s/files/1/2086/9287/products/1086325620745_1024x1024.jpg?v=1628204120", id: 1},
      { quantity: 4 ,name: `Hot Pepper Sauce | Dirty Dick's Hot Sauce`,description:`Dirty Dick’s Hot Sauce blends habanero peppers with tropical fruits for a sweet and spicy sauce. Let the sweetness of bananas, raisins, and pineapples linger on your palate and wait for the heat to kick in. Great for beef stir-fry, chicken wraps, and as a stand-alone dipping sauce for the daring.`, price:12.00, type: "Hot", flavor:"Medium", img: "https://cdn.shopify.com/s/files/1/2086/9287/products/368548413449_1024x1024.jpg?v=1628203418", id: 1},
      { quantity: 4 ,name: `Tikk-Hot Masala Hot Sauce | High Desert`,description:`An aromatic spice blend, this hot sauce brings creamy coconut milk and tangy tomatoes blended with a medium-hot mix of Anaheim, ghost and Carolina Reaper peppers - basically all the flavors of your favorite Tikka Masala. A little agave nectar adds sweetness, with fresh garlic and toasted cumin bringing the savory. `, price:9.00, type: "Hot", flavor:"Medium", img: "https://cdn.shopify.com/s/files/1/2086/9287/products/tikk-hotmasala_1024x1024.jpg?v=1622751545", id: 1},
      { quantity: 4 ,name: `Atlanta Hot Sauce | Small Axe Peppers`,description:`A crowd-sourced sauce that supports Atlanta community gardens! The team at Small Axe Peppers partners with neighborhood gardens around the country to source peppers for sauces inspired by the local food culture. When they reached out to us for advice on which city they should go to next, we passed the question to our hot sauce community who voted overwhelmingly for The Big Peach! `, price:12.00, type: "Hot", flavor:"Medium", img: "https://cdn.shopify.com/s/files/1/2086/9287/products/atl-sauce_1024x1024.jpg?v=1628213867", id: 1},
      { quantity: 4 ,name: `Smoked Onion Hot Sauce | Butterfly Bakery of Vermont`,description:`The makers at Butterfly Bakery smoke Vermont onions with maplewood to mix with red jalapeños for this sweet and tangy sauce. Great on everything from bagels lox & cream cheese to hummus to pork and whatever else you can name. `, price:11.00, type: "Hot", flavor:"Medium", img: "https://cdn.shopify.com/s/files/1/2086/9287/products/4866924937314_1024x1024.jpg?v=1553815597", id: 1},
      { quantity: 4 ,name: `Son of Zombie Hot Sauce | Torchbearer Sauces`,description:`Where Zombie Apocalypse headed straight for the pepper content, this offspring adds in complex flavors from honey, onions, molasses and oregano for a kick-ass wing sauce. The sweetness will caramelize on wings or anything on the grill, with just enough heat to leave you wanting more. Don't be shy with this one.`, price:11.00, type: "Hot", flavor:"Medium", img: "https://cdn.shopify.com/s/files/1/2086/9287/products/3565619445876_1024x1024.jpg?v=1628214847", id: 1},
      { quantity: 4 ,name: `Big Smoke | Dawson's Hot Sauce`,description:`Loaded with pepper flavor, this sauce packs a flavorful punch. Look for the distinct tastes of Chipotle, Scotch Bonnet, Jalapeno and Red Sheppard, as well as fresh green chilis & spicy Vietnamese hots. This varied combination activates heat receptors all over the mouth making this sauce a unique tasting treat.`, price:13.00, type: "Hot", flavor:"Medium", img: "https://cdn.shopify.com/s/files/1/2086/9287/products/2540301058164_1024x1024.jpg?v=1628202469", id: 1},
      { quantity: 4 ,name: `Goat Rider Hot Sauce | Angry Goat Pepper Co`,description:`The makers of everyone’s favorite hippy dippy hot sauce are back with a new sauce full of comforting flavors and a medium kick. Cayenne starts off the heat, with a slight upfront burn that makes way for notes of warm balsamic and hints of sweet Vermont maple syrup. Roasted red bell pepper and garlic balance things out on the savory side. Then the ghost pepper peeks in for a little unexpected punch!`, price:10.00, type: "Hot", flavor:"Medium", img: "https://cdn.shopify.com/s/files/1/2086/9287/products/ANGRYGOAT1_1024x1024.jpg?v=1628200179", id: 1},
      { quantity: 4 ,name: `Collards N Ghost Hot Sauce | Hot N Saucy`,description:`Collard greens in a hot sauce? You read that correctly, and you better believe this sauce will change your mind about leafy greens! `, price:11.00, type: "Hot", flavor:"Medium", img: "https://cdn.shopify.com/s/files/1/2086/9287/products/HOTONES-SEASON18-collardsnghost_28e5767f-d2c4-4b58-b7cc-a443e69dd93b_1024x1024.jpg?v=1652971436", id: 1},
      { quantity: 4 ,name: `Cheeba Gold Hot Sauce | High River Sauces`,description:`High River Sauces Cheeba Gold is their newest offering, blending Scotch Bonnet and Fatalii peppers with peaches, lemon and a touch of mustard for real island vibes. This sauce is perfect for chicken & rice, on grilled fish, or added right into a salsa.`, price:12.00, type: "Hot", flavor:"Medium", img: "https://cdn.shopify.com/s/files/1/2086/9287/products/400119332873_1024x1024.jpg?v=1628206246", id: 1},

      { quantity: 4 ,name: `Tyrfing’s Curse | Halogi Hot Sauce`,description:`Tyrfing’s Curse is a tart and gingery blend of orange juice, ghost pepper, habanero, and Scorpion peppers. Tartness from the citrus seems to amplify the sting of the chili peppers, waking up your taste buds. Despite its intimidating name and pepper blend, Tyrfing’s Curse is easy to love.`, price:12.00, type: "Hot", flavor:"Hot",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/HOTONES-SEASON18-Halogi_1024x1024.jpg?v=1652731253", id: 1},
      { quantity: 4 ,name: `Yuzu Heaven Hot Sauce | Mellow Habanero`,description:`Friends of the Brooklyn hot sauce shop will recognize Mellow Habanero and our good friend Taku “Habanero Man” Kondo of ta-nm farm in Hyogo, Japan! This HEATONIST exclusive hot sauce combines Tak’s favorite golden habanero peppers with tangy, citrusy yuzu.`, price:13.00, type: "Hot", flavor:"Hot",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/YUZU1_1024x1024.jpg?v=1628211120", id: 1},
      { quantity: 4 ,name: `Carnival Hot Sauce | Karma Sauce`,description:`A boisterous blend of Scotch Bonnet, Fatalii, and Trinidad Scorpion peppers make your tastebuds tingle before the sauce hits your lips! The fruity and floral notes of the peppers pair nicely with the green mango and a dash of savory follows suit from thyme. `, price:11.00, type: "Hot", flavor:"Hot",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/Canival-karma1_993269b3-78d6-49be-a3c6-2739cd86259c_1024x1024.jpg?v=1628209985", id: 1},
      { quantity: 4 ,name: `Bourbon Habanero Ghost Hot Sauce | Hell Fire Detroit`,description:`Hell Fire Detroit is on a booze-infused roll that’s delivering hit after hit! Newest to their lineup is an oaky bourbon and habanero hot sauce loaded with oaky bourbon barrel flavor! The habaneros are fire roasted and accompanied by smoked ghost chile powder for additional earthiness and sting. Apple cider vinegar and lime juice add acidity for a bold sauce that pairs well with BBQ, baked sweet potatoes, or roasted chicken.`, price:14.00, type: "Hot", flavor:"Hot",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/hellfire_1024x1024.jpg?v=1628204436", id: 1},
      { quantity: 4 ,name: `Aka Miso Hot Sauce | Bravado Spice Co`,description:`The Bravado boys are back with another Reaper sauce! This time, combined with Ghost Peppers for a lingering burn that builds. An umami bomb with funky aka miso flavor and tamari, Aka Miso also features Togarashi - a traditional Japanese pepper mix that’s commonly used to spice up sushi or grilled meats.`, price:13.00, type: "Hot", flavor:"Hot",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/miso_1024x1024.jpg?v=1628200367", id: 1},
      { quantity: 4 ,name: `Bhutila Fire Hot Sauce | Chile Lengua de Fuego`,description:`Featuring a smoked version of the Caribbean’s favorite pepper, the Scotch bonnet, as well as Chocolate Ghost peppers, Bhutila gets its name from an island off the coast of Honduras. And it’s a fire you can feel good about - a portion of all sales goes to protecting their coral reef!`, price:10.00, type: "Hot", flavor:"Hot",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/hotones-bhutilafire-hotsauce_1024x1024.jpg?v=1631222766", id: 1},
      { quantity: 4 ,name: `Love Burns Hot Sauce | Hotter Than El`,description:`This bright, vinegar-forward sauce gets its pleasant peppery notes from a mix of 7 Pot Primo, Carolina Reaper and Trinidad Scorpion peppers. Plus some ghost chile powder for good measure! Lime juice and carrots add freshness and tang, making this an excellent hot wing sauce (mix with melted butter unless you’re ready to handle the burn). `, price:10.00, type: "Hot", flavor:"Hot",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/Hotterthanelloveburns_1024x1024.jpg?v=1622751546", id: 1},
      { quantity: 4 ,name: `Garlic Reaper Sauce Hot Sauce | Torchbearer Sauces`,description:`The first ingredient is this hot sauce is Carolina Reaper, and the second ingredient is garlic. Need we say more? This sauce is unlike any other we’ve had on Hot Ones, with a rich oil base that gives it a creamy texture with just enough savory spices to round out that garlic. `, price:14.00, type: "Hot", flavor:"Hot",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/7944157921378_1024x1024.jpg?v=1628214667", id: 1},
      { quantity: 4 ,name: `Honey Badger Hot Sauce | Torchbearer Sauces`,description:`The crew at Torchbearer know how to up the heat without sacrificing flavor, and this sauce’s potent mix of Scorpion peppers and Carolina Reapers combined with honey and mustard is all the proof you’ll need. `, price:8.00, type: "Hot", flavor:"Hot",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/honeybadger_1024x1024.jpg?v=1616537141", id: 1},
      { quantity: 4 ,name: `Pierdealmas Hot Sauce | Chile Monoloco`,description:`Small-batch maker Chile Monoloco sources scotch bonnet and ghost peppers from local Costa Rican farmers to make this beautiful pepper sauce with face-melting heat. The addition of citrusy lemon juice highlights the naturally bright, tropical flavor of the peppers.`, price:8.00, type: "Hot", flavor:"Hot",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/Monoloco_1024x1024.jpg?v=1628211893", id: 1},
      { quantity: 4 ,name: `Fiya! Fiya! Hot Sauce | Adoboloco`,description:`This newest sauce from Adoboloco stays true to the maker’s Hawaiian roots with a ton of tangy apple cider vinegar but kicks it up a notch with a blend of four hot peppers including ghost, Trinidad scorpion, habanero & jalapeno. Rounded out with sea salt and garlic, Fiya! Fiya! is their hottest yet but is still usable for everyday applications.`, price:9.00, type: "Hot", flavor:"Hot",img:"https://cdn.shopify.com/s/files/1/2086/9287/products/FIYAFIYA_ea4072e4-1c2d-4ef6-b451-3a320e654e91_1024x1024.jpg?v=1628199607", id: 1},

      
      { quantity: 4 ,name: `The Last Dab XXX | Hot Ones Hot Sauce`,description:`CAUTION! The hottest sauce on Hot Ones cranks the spice level even higher with this special XXX-rated version of the Last Dab. Three distinct strains of Smokin' Ed Currie's most infamous chili-pepper, Pepper X, Chocolate Pepper X, and Peach Pepper X, combine to smoke out celebrity guests and fans alike.`, price:15.00, type: "Hot", flavor:"Blazing", img:"https://cdn.shopify.com/s/files/1/2086/9287/products/dabxxx1_1024x1024.jpg?v=1628209214",id: 1},
      { quantity: 4 ,name: `Evolution Hot Sauce | Da Bomb`,description:` This fresh take on the hotly hyped original packs much of the same heat but with loads of flavor. Fiery red super hot scorpion peppers are balanced with hearty spices like paprika and turmeric, as well as sugar, garlic and lemon for a sauce that stops you in your tracks as much for its savory flavor as its heat. `, price:13.00, type: "Hot", flavor:"Blazing", img:"https://cdn.shopify.com/s/files/1/2086/9287/products/dabombevolution1_1024x1024.jpg?v=1616536949",id: 1},
      { quantity: 4 ,name: `The Last Dab: Apollo | Hot Ones Hot Sauce`,description:`The Last Dab: Apollo joins the Hot Ones lineup as the new king of Mt. Scoville, hero of hot sauces, and crusher of celebrities and chiliheads alike. The Apollo Pepper has been carefully bred and nurtured by Guinness World Record holding chili breeder Smokin’ Ed Currie of Puckerbutt Pepper Co from prized strains of his famed Carolina Reaper and Pepper X. The Apollo brings this heritage to new heights of capsaicin, packing a more concentrated punch than any of its forebears.`, price:22.00, type: "Hot", flavor:"Blazing", img:"https://cdn.shopify.com/s/files/1/2086/9287/products/apollo_1024x1024.jpg?v=1628214582",id: 1},
      { quantity: 4 ,name: `Burn After Eating Hot Sauce | Karma Sauce`,description:`Gene from Karma Sauce Co always comes up with unique flavor combinations and this is no exception. For Burn After Eating he sourced ajwain, a spice used in Indian cuisine that has a uniquely earthy and bitter flavor. `, price:20.00, type: "Hot", flavor:"Blazing", img:"https://cdn.shopify.com/s/files/1/2086/9287/products/burnafter_1024x1024.jpg?v=1628209938",id: 1},
      { quantity: 4 ,name: `Kranked Hot Sauce | Hellfire Hot Sauce`,description:`Hellfire is upping the ante with both bold flavor and heat with this black garlic meets curry number. Carolina Reapers add a sinister delayed spice that won’t go quietly. Perfect for kranking up the volume on rich dishes like curries, mac and cheese or even short ribs. `, price:18.00, type: "Hot", flavor:"Blazing", img:"https://cdn.shopify.com/s/files/1/2086/9287/products/hotones-kranked-hotsauce_1024x1024.jpg?v=1631223105",id: 1},
]
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