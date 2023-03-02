const { createUser } = require( "./users");
const{createCar}=require("./cars")
const{createRatings}=require('./ratings')
const client = require("./client");
const { createCart } = require("./cart");
const{addItemsToCart}=require("./cartItems")



async function dropTables() {
    try {
  
    console.log('Dropping All Tables...');
        
    
    await  client.query(`
          DROP TABLE IF EXISTS cart_items;
          DROP TABLE IF EXISTS cart;
          DROP TABLE IF EXISTS ratings;
          DROP TABLE IF EXISTS cars;
          DROP TABLE IF EXISTS users;
      `)
  
    console.log('finished dropping tables')
    }catch(error){
      console.log("error dropping tables")
    }
  }
  async function createTables(){
    console.log('Starting to build tables')
try{
    await  client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL,
      email varchar(255) UNIQUE NOT NULL,
      firstname varchar(255) NOT NULL,
      lastname varchar(255) NOT NULL,
      street varchar(255) NOT NULL,
      city varchar(255) NOT NULL,
      state varchar(255) NOT NULL,
      zip varchar(255) UNIQUE NOT NULL,
      phone varchar(255) UNIQUE NOT NULL,
      isadmin BOOLEAN DEFAULT FALSE
    );`)
    await client.query(`
    CREATE TABLE cars (
      id SERIAL PRIMARY KEY,
      make varchar(255) NOT NULL,
      model varchar(255) NOT NULL,
      year integer,
      price DECIMAL(10, 2) NOT NULL,
      inventory integer,
      condition varchar(255) NOT NULL,
      engine varchar(255) NOT NULL,
      transmission varchar(255) NOT NULL,
      drivetrain varchar(255) NOT NULL,
      fuel varchar(255) NOT NULL,
      exteriorcolor varchar(255) NOT NULL,
      interiorcolor varchar(255) NOT NULL,
      description varchar(255) NOT NULL
    );`)
await client.query(`
    CREATE TABLE ratings (
      id SERIAL PRIMARY KEY,
      userid integer REFERENCES users(id),
      vehicleid integer REFERENCES cars(id),
      review varchar(255) NOT NULL,
      stars integer
    );`)
    await client.query(`
    CREATE TABLE cart (
      id SERIAL PRIMARY KEY,
      user_id integer REFERENCES users(id),
      date_purchased varchar(255),
      transactioncomplete BOOLEAN DEFAULT FALSE
    );`)
    await client.query(`
    CREATE TABLE cart_items (
      id SERIAL PRIMARY KEY,
      cart_id integer REFERENCES cart(id),
      vehicle_id integer REFERENCES cars(id),
      quantity integer DEFAULT 0
    );`)

  

   

   console.log("finished building tables")
      } catch (error) {
  console.error("Error building tables!");
  throw error;
}
}

async function createInitialUsers() {
    try {
      // users
      const usersToCreate = [
          { username: "mike123", password: 'password1', email:'mike@gmail.com',firstname:"mike",lastname:"miller",street:"123 drive",city:"hills",state:"arizone",zip:'12345',phone:'123456789'},
          { username: 'manchester', password: 'united', email:'manu@yahoo.com',firstname:"bob",lastname:"builder",street:"321 drive",city:"dallas",state:"texas",zip:'54321',phone:'987654321'}
      ];

      const users = await Promise.all(usersToCreate.map(createUser))
      console.log('Finished creating users!');
    } catch (error) {
      console.error("Error building tables!", error)
      throw error;
    }
  }

  async function createInitialCars(){
    console.log("started creating cars!")
    try{
    const carsToCreate = [
      {
        make:'ford',
        model:'mustang',
        year:'2022',
        price:30000,
        inventory:'20',
        condition:'brand-new',
        engine:'v8',
        transmission:'6-speed manual',
        drivetrain:'RWD',
        fuel:'gas',
        exteriorcolor:'red',
        interiorcolor:'black',
        description:'brand new mustang for sale!!'
      },
      {
        make:'chevy',
        model:'corvette',
        year:'2021',
        price:50000,
        inventory:'10',
        condition:'brand-new',
        engine:'v8',
        transmission:'6-speed manual',
        drivetrain:'RWD',
        fuel:'gas',
        exteriorcolor:'balck',
        interiorcolor:'black',
        description:'brand new corvette for sale!!'
      }
    ];
    const cars = await Promise.all(carsToCreate.map(createCar))

    console.log("finished creating cars!")

    }catch(error){
      console.log(error,"error creating cars")
    }
  }
  async function createInitalRatings(){
    console.log("started created ratings!")
    try{
const ratingsToCreate = [
  {
    userid:1,
    vehicleid:1,
    review:'car drives amazing and is very reliable!',
    stars:'5'
  },
  {
    userid:2,
    vehicleid:2,
    review:'car is very slow and sluggish',
    stars:3
  }
]
const ratings = await Promise.all(ratingsToCreate.map(createRatings))
console.log("finished created ratings!")
    }catch(error){
      console.log(error,"error creating ratings")
    }
  }
  async function createInitialCart(){
    console.log("started creating cart")
    try{
const cartToCreate = [
  {
    user_id:1,
    total_price:'5000',
    date_purchased:'01/01/2023',
    transactioncomplete:true
  },
  {
    user_id:2,
    total_price:'1000',
    date_purchased:'11/01/2022',
    transactioncomplete:true
  }
]
const cart = await Promise.all(cartToCreate.map(createCart))
console.log("finished creating cart!")
    }catch(error){
      console.log(error,"error creating cart")
    }
  }
  async function createInitialCartItems(){
    console.log("started adding items to cart")
    try{
      const cartItemsToAdd = [
        {
          cart_id:1,
          vehicle_id:2,
          quantity:5
        },
        {
          cart_id:1,
          vehicle_id:1,
          quantity:1
        },
        {
          cart_id:2,
          vehicle_id:2,
          quantity:3
        },
        {
          cart_id:2,
          vehicle_id:1,
          quantity:10
        }
      ]
      const cartItems = await Promise.all(cartItemsToAdd.map(addItemsToCart))
console.log("finished adding items to cart!")
    }catch(error){
      console.log(error,"error adding items to cart")
    }
  }
  async function rebuildDB() {
    try {
      client.connect();
  
      await dropTables();
      await createTables();
      await createInitialUsers();
      await createInitialCars()
      await createInitalRatings()
      await createInitialCart()
      await createInitialCartItems()
    } catch (error) {
      console.log("Error during rebuildDB")
      throw error;
    }
  }
  // async function testDB() {
  //   try {
  //     console.log("Starting to test database...");
  
  //     console.log("Calling createUsers");
  //     const users = await createUser();
  //     console.log("Result:", users);
  
  //   }catch(error){
  //     console.log(error)
  //   }
  // }
  
  rebuildDB()
    .catch(console.error)
    .finally(() => client.end());