const { createUser } = require( "./users");
const{createCar}=require("./cars")
const{createRatings}=require('./ratings')
const client = require("./client");
const { createCart } = require("./cart");
const{addItemsToCart}=require("./carttItems")



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
      firstname varchar(255)  NOT NULL,
      lastname varchar(255) NOT NULL,
      street varchar(255) NOT NULL,
      city varchar(255) NOT NULL,
      state varchar(255) NOT NULL,
      zip varchar(255)  NOT NULL,
      phone varchar(255)  NOT NULL,
      isadmin BOOLEAN DEFAULT FALSE
    );`)
    await client.query(`
    CREATE TABLE cars (
      id SERIAL PRIMARY KEY,
      make varchar(255) NOT NULL,
      model varchar(255) NOT NULL,
      year integer,
      price DECIMAL(10, 2) NOT NULL,
      img varchar(255) NOT NULL,
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
          { username: "mike123", hashedPassword: 'password1', email:'mike@gmail.com',firstname:"mike",lastname:"miller",street:"123 drive",city:"hills",state:"arizone",zip:'12345',phone:'123456789'},
          { username: 'manchester', hashedPassword: 'united', email:'manu@yahoo.com',firstname:"bob",lastname:"builder",street:"321 drive",city:"dallas",state:"texas",zip:'54321',phone:'987654321'}
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
        make:'Rolls Royce',
        model:'Cullinan',
        year:'2023',
        price:425000,
        img:'www.wheelfront.com/wp-content/uploads/formidable/8/rolls-royce-cullinan-agluxury-wheels-agl48rr-monoblock-two-tone-gloss-white-polished-windows-4.jpg',
        inventory:'5',
        condition:'brand-new',
        engine:'v12',
        transmission:'8-speed automatic',
        drivetrain:'AWD',
        fuel:'gas',
        exteriorcolor:'white',
        interiorcolor:'black',
        description:'Beautiful 2023 Rolls Royce Cullinan with 8-speed automatic transmission and 563hp. This beauty has a black leather interior with a sunroof/moonroof. All wheel drive allows you to drive in luxury in any terrain!'
        },
        {
        make:'Aston Martin',
        model:'DBX 707',
        year:'2023',
        price:250000,
        img:'www.astonmartinwashingtondc.com/imagetag/3376/34/l/New-2023-Aston-Martin-DBX-707-1675721659.jpg',
        inventory:'3',
        condition:'brand-new',
        engine:'v8',
        transmission:'9-speed automatic',
        drivetrain:'AWD',
        fuel:'gas',
        exteriorcolor:'gray',
        interiorcolor:'black',
        description:'Beautiful 2023 Aston Martin DBX 707 with 9-speed automatic transmission and 697hp. This beauty has a black leather interior with a sunroof/moonroof. This sleek crossover provides the space without sacrificing the luxury!'
        },
        {
        make:'Mercedes Benz',
        model:'G 550',
        year:'2022',
        price:145000,
        img:'https://photos.dealerimagepro.com/lib/mercedes-benz-des-moines/12.28.2022/USED/%28Mercedes-Benz%20-%20G-Class%29W1NYC6BJ8NX445287%282%29/W1NYC6BJ8NX445287--01.jpg',
        inventory:'1',
        condition:'brand-new',
        engine:'v8',
        transmission:'9-speed automatic',
        drivetrain:'AWD',
        fuel:'gas',
        exteriorcolor:'black',
        interiorcolor:'black',
        description:'Beautiful 2022 Mercedes G 550 SUV with 9-speed automatic transmission and 416hp. This beauty has a black leather interior with a sunroof/moonroof.'
        },
        {
        make:'Tesla',
        model:'Model X',
        year:'2023',
        price:101000,
        img:'https://history-computer.com/wp-content/uploads/2022/08/Tesla-Model-X-tires-header-scaled.jpg',
        inventory:'2',
        condition:'brand-new',
        engine:'electric',
        transmission:'N/A - Battery 100kWh 410-V lithium ion ',
        drivetrain:'AWD',
        fuel:'N/A',
        exteriorcolor:'white',
        interiorcolor:'white',
        description:'Beautiful 2023 Tesla Model X with a 410 V lithium-ion battery. This beauty has a gray leather interior with a sunroof/moonroof.'
        },
        {
        make:'Audi',
        model:'S4 3.0T Premium Plus Sedan',
        year:'2023',
        price:61000,
        img:'https://www.indigoautogroup.com/inventoryphotos/3228/waub4af43pa020791/ip/1.jpg',
        inventory:'6',
        condition:'brand-new',
        engine:'3.0L TFSI',
        transmission:'8-speed automatic',
        drivetrain:'quattro',
        fuel:'gas',
        exteriorcolor:'charcoal gray',
        interiorcolor:'black',
        description:'Beautiful 2023 Audi S4 sedan with 8-speed automatic transmission. This beauty has a black leather interior and can seat up to 5 passengers.'
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
    transactioncomplete:false
  },
  {
    user_id:2,
    transactioncomplete:false
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