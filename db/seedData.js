const { createUser, createCar, createVehicleInfo, createReview, createCheckout} = require("./");
const client = require("./client");



async function createTables() {
    try {
  
    console.log('Dropping All Tables...');
        
    client.connect();
    
    await  client.query(`
          DROP TABLE IF EXISTS cars;
          DROP TABLE IF EXISTS users;
          DROP TABLE IF EXISTS vehicleinfo;
          DROP TABLE IF EXISTS checkout;
          DROP TABLE IF EXISTS reviews;
      `)
  
    console.log('finished to dropping tables')
  
    console.log('Starting to build tables')

    await  client.query(`
      CREATE TABLE cars(
      id SERIAL PRIMARY KEY, 
      make INTEGER NOT NULL,
      model INTEGER NOT NULL,
      year INTEGER NOT NULL,
      image Text
      );
  `)

    await  client.query(`
        CREATE TABLE users(
        id SERIAL PRIMARY KEY, 
        username NOT NULL,
        password NOT NULL,
        email NOT NULL
        );
    `)

    await  client.query(`
        CREATE TABLE vehicle_info(
        id SERIAL PRIMARY KEY, 
        vehicleId REFERENCES cars(id),
        condition VARCHAR(255) NOT NULL,
        engine VARCHAR(255) NOT NULL,
        transmission VARCHAR(255) NOT NULL,
        drivetrain VARCHAR(255) NOT NULL,
        fuel NOT NULL DEFAULT gas,
        exteriorcolor VARCHAR(255) NOT NULL,
        interiorcolor VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL
        );
    `)

    await  client.query(`
      CREATE TABLE reviews(
      id SERIAL PRIMARY KEY, 
      "productId" INTEGER NOT NULL REFERENCES cars(id),
      "userId" INTEGER NOT NULL REFERENCES users(id),
      reviewtext TEXT NOT NULL
      );
  `)
  
  await  client.query(`
      CREATE TABLE checkouts(
      id SERIAL PRIMARY KEY, 
      "userId" INTEGER REFERENCES users(id),
      firstName VARCHAR(255) NOT NULL,
      lastName VARCHAR(255) NOT NULL,
      street VARCHAR(255) NOT NULL,
      city VARCHAR(255) NOT NULL,
      state VARCHAR(255) NOT NULL,
      zip VARCHAR(255) NOT NULL,
      phone VARCHAR(255) NOT NULL,
      creditCard VARCHAR(255) NOT NULL,
      "transactionProcessed" BOOLEAN DEFAULT true
      );
  `)

  console.log('Finished building tables')

} catch (error) {
  console.error("Error building tables!");
  throw error;
}
}

async function databaseInit() {
    try {
      // users
      const usersToCreate = [
          { username: 'mike', password: 'password1', email:'mike@gmail.com' },
          { username: 'manchester', password: 'united', email:'manu@yahoo.com' }
      ];
  
      const users = await Promise.all(usersToCreate.map(createUser));
      console.log('Users created:');
      console.log(users);
      console.log('Finished creating users!');
  
      console.log('Starting to create cars...');
      const carsToCreate = [
          { make: 'McClaren', model: '720S', year: 2022, image:''},
          { make: 'Ferrari', model: 'Roma',  year: 2021, image:'' }
          ];
  
        
      const cars = await Promise.all(carsToCreate.map(createCar));
      console.log('Cars created:');
      console.log(cars);
      console.log('Finished creating Cars!');
 
      
    //   vehicle info needs to be formatted to match table creation
    //   console.log('starting to create vehicle info...');
    //   const vehicleInfoToCreate = [
    //       { vehicleId: 1,  },
    //       { userId: 1,  }
    //   ];
      
      const vehicleInfo = await Promise.all(vehicleInfoToCreate.map(createVehicleInfo));
      console.log('Vehicle info Created: ', vehicleInfo)
      console.log('Finished creating vehicle info.')
  
      console.log('starting to create checkouts...');
      const checkoutsToCreate = [
          { userId: 1, firstName: "mike", lastName:'kody',street:"111 st", city:"Middle of Nowhere", state:"Virginia",zip:"11111", creditCard: '1234123412341234', phone: '8675309' },
          { userId: 2, firstName: "safir", lastName:'julian',street:"222 blvd", city:"Qarth", state:"Texas",zip:"22222", creditCard: '2222333344445555', phone: '23423412' }
      ];
  
      const checkouts = await Promise.all(checkoutsToCreate.map(createCheckout));
      console.log('Checkouts Created: ', checkouts)
      console.log('Finished creating checkouts.')
  
      // Reviews
      console.log('starting to create reviews...');
      const reviewsToCreate = [
          { productId: 1, userId: 1, reviewtext:'Faster than the speed of light!' },
          { productId: 2, userId: 1, reviewtext:'This car is nice.'}
      ];
      const reviews = await Promise.all(reviewsToCreate.map(createReview));
      console.log('Reviews Created: ', reviews)
      console.log('Finished creating reviews.')
  
    } catch (error) {
      console.error("Error building tables!", error)
      throw error;
    }
  }
  
  createTables()
    .then(databaseInit)
    .catch(console.error)
    .finally(() => client.end());