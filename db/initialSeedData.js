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
      price INTEGER,
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
          { username: "mike123", hashedPassword: '$2a$10$.FCPbw8cQ2hWCE4vUtJ4IOPDHozllqJlWOboaT5uVnBnJ5UMxb0wm', email:'mike@gmail.com',firstname:"mike",lastname:"miller",street:"123 drive",city:"hills",state:"arizone",zip:'12345',phone:'123456789'},
          { username: 'manchester', hashedPassword: '$2a$10$LiRuWwioN6T1OppVogisH.UiKboDtRlfVgQifhCK2gTFm/a31lanK', email:'manu@yahoo.com',firstname:"bob",lastname:"builder",street:"321 drive",city:"dallas",state:"texas",zip:'54321',phone:'987654321'},
          { username: 'kodykid1994', hashedPassword: '$2b$10$8Un.yYmt8kE9ZkHH43/BKOCJ5d9/ISFw7lnDZe3HCfAcCkiqmK6Xe', email:'kody524@icloud.com',firstname:"kody",lastname:"richardson",street:"321 drive",city:"dallas",state:"texas",zip:'54321',phone:'987654321',isadmin:true},
          { username: 'tester1', hashedPassword: '$2a$10$FEYFNBHJ0zimF.frYgjvz.mXT/X.k2NsMdy7UTTH0u7L/DCSgGEwC', email:'manu@yahoo.com9',firstname:"bob",lastname:"builder",street:"321 drive",city:"dallas",state:"texas",zip:'54321',phone:'987654321'},
          { username: 'tester2', hashedPassword: '$2a$10$wYu3voiJPEZZJlMzurmW3uu0XqpQdVX2KO34qgwhIgrNK.aqm.XsC', email:'manu@yahoo.com1',firstname:"bob",lastname:"builder",street:"321 drive",city:"dallas",state:"texas",zip:'54321',phone:'987654321'},
          { username: 'tester3', hashedPassword: '$2a$10$kPiFkupAdePt1hghEGWrCeKzQVKg0QQ4DAppQI7xErzg56TRSkXsW', email:'manu@yahoo.com2',firstname:"bob",lastname:"builder",street:"321 drive",city:"dallas",state:"texas",zip:'54321',phone:'987654321'},
          { username: 'tester4', hashedPassword: '$2a$10$M4SAR1YTKQoO1M68/eZL4u5isC5r6A8hFFZNnXf5INAq3l3Xm5vbu', email:'manu@yahoo.com3',firstname:"bob",lastname:"builder",street:"321 drive",city:"dallas",state:"texas",zip:'54321',phone:'987654321'},
          { username: 'tester5', hashedPassword: '$2a$10$qbTCYpMQrfuzfMHUgS1fS.yUu55Jx9XmR1JlD3BrY7jktsGMwSBIy', email:'manu@yahoo.com4',firstname:"bob",lastname:"builder",street:"321 drive",city:"dallas",state:"texas",zip:'54321',phone:'987654321'},
          { username: 'tester6', hashedPassword: '$2a$10$xhdDTMh5jdgYwyaGeTxbZuIMv8pzZTVTLCKgyiHst3p9yzPED97Eu', email:'manu@yahoo.com5',firstname:"bob",lastname:"builder",street:"321 drive",city:"dallas",state:"texas",zip:'54321',phone:'987654321'},
          { username: 'tester7', hashedPassword: '$2a$10$DV5NS6knRheQzVUb98X7YuUnOoAi8lyVkLLqlOZJVSDC8OL0K3WtS', email:'manu@yahoo.com6',firstname:"bob",lastname:"builder",street:"321 drive",city:"dallas",state:"texas",zip:'54321',phone:'987654321'},
          { username: 'tester8', hashedPassword: '$2a$10$3yTAcxyvFKU92yUvzr/HoecNXK2yc5Q0NSdrkWMBSbajQiAPKQoJe', email:'manu@yahoo.com7',firstname:"bob",lastname:"builder",street:"321 drive",city:"dallas",state:"texas",zip:'54321',phone:'987654321'}
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
        img:'https://wheelfront.com/wp-content/uploads/formidable/8/rolls-royce-cullinan-agluxury-wheels-agl48rr-monoblock-two-tone-gloss-white-polished-windows-4.jpg',
        inventory:'1',
        condition:'brand-new',
        engine:'v12',
        transmission:'8-speed automatic',
        drivetrain:'AWD',
        fuel:'gas',
        exteriorcolor:'White',
        interiorcolor:'Black',
        description:'Beautiful 2023 Rolls Royce Cullinan with 8-speed automatic transmission and 563hp. This beauty has a black leather interior with a sunroof/moonroof. All wheel drive allows you to drive in luxury in any terrain!'
        },
        
        {
        make:'Aston Martin',
        model:'DBX 707',
        year:'2023',
        price:250000,
        img:'https://www.astonmartinwashingtondc.com/imagetag/3376/34/l/New-2023-Aston-Martin-DBX-707-1675721659.jpg',
        inventory:'1',
        condition:'brand-new',
        engine:'v8',
        transmission:'9-speed automatic',
        drivetrain:'AWD',
        fuel:'gas',
        exteriorcolor:'Gray',
        interiorcolor:'Black',
        description:'Beautiful 2023 Aston Martin DBX 707 with 9-speed automatic transmission and 697hp. This beauty has a black leather interior with a sunroof/moonroof',
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
        exteriorcolor:'Black',
        interiorcolor:'Black',
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
        exteriorcolor:'White',
        interiorcolor:'White',
        description:'Beautiful 2023 Tesla Model X with a 410 V lithium-ion battery. This beauty has a gray leather interior with a sunroof/moonroof. Cruise in style while maintaining a minimal carbon footprint.'
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
        exteriorcolor:'Charcoal Gray',
        interiorcolor:'Black',
        description:'Beautiful 2023 Audi S4 sedan with 8-speed automatic transmission. This beauty has a black leather interior and can seat up to 5 passengers.'
        },
        
        {
        make:'Land Rover',
        model:'Range Rover SV Carmel',
        year:'2023',
        price:345000,
        img:'https://www.kbb.com/wp-content/uploads/2022/08/2023-Range-Rover-SV-Carmel-Edition-front-quarter-left.jpg?resize=763,610',
        inventory:'1',
        condition:'brand-new',
        engine:'v12',
        transmission:'9-speed automatic',
        drivetrain:'AWD',
        fuel:'gas',
        exteriorcolor:'White',
        interiorcolor:'Black',
        description:'Limited! Limited! Limited! This is one of the 17 models Land Rover released for the SV Carmel edition'
        },
        
        {
        make:'Bentley',
        model:'Continental GT Convertible',
        year:'2023',
        price:294000,
        img:'https://images.dealer.com/ddc/vehicles/2023/Bentley/Continental%20GT/Convertible/trim_Base_3be2a1/color/Magnolia-6908-175%2C160%2C138-640-en_US.jpg?impolicy=resize&w=1024',
        inventory:'1',
        condition:'brand-new',
        engine:'v8',
        transmission:'8-speed automatic',
        drivetrain:'AWD',
        fuel:'gas',
        exteriorcolor:'Magnolia',
        interiorcolor:'Oak',
        description:'Feel the wind in your hair with this 2023 Bentley Continental GT Convertible with 8-speed automatic transmission. All wheel drive allows you to drive in luxury in any terrain!'
        },
        
        {
        make:'Mercedes-Maybach',
        model:'S680 4MATIC',
        year:'2022',
        price:260000,
        img:'https://hips.hearstapps.com/hmg-prod/images/22c0062-001-source-1649187728.jpg?crop=0.822xw:0.617xh;0.0913xw,0.274xh&resize=640:*',
        inventory:'1',
        condition:'brand-new',
        engine:'v12',
        transmission:'8-speed automatic',
        drivetrain:'AWD',
        fuel:'gas',
        exteriorcolor:'MANUFAKTUR Selenite Grey Magno(matte)',
        interiorcolor:'Black',
        description:'This gorgeous Maybach will have you riding in luxury and style. With a powerful V12 engine you\'ll accelerate 0-60 mph in 4.5 seconds. With a spacious interior the whole family can ride!'
        },
        
        {
        make:'Mercedes-Maybach',
        model:'S580 4MATIC',
        year:'2022',
        price:230000,
        img:'https://hips.hearstapps.com/hmg-prod/images/22c0062-001-source-1649187728.jpg?crop=1.00xw:0.564xh;0,0.239xh&resize=2048:*',
        inventory:'1',
        condition:'brand-new',
        engine:'v8',
        transmission:'8-speed automatic',
        drivetrain:'AWD',
        fuel:'gas',
        exteriorcolor:'MANUFAKTUR Kalahari Gold/Onyx Black Metallic',
        interiorcolor:'Black',
        description:'Take the top off this 2022 S580 Maybach featuring a beautiful leather interior, a Bose sound system, and interior lighting. Cruise and arrive in style to any occasion!'
        },
        
        {
        make:'Bentley',
        model:'Flying Spur Azure',
        year:'2023',
        price:425000,
        img:'https://www.astonmartinwashingtondc.com/imagetag/3414/5/l/New-2023-Bentley-FLYING-SPUR-Azure-Hybrid-1673894233.jpg',
        inventory:'1',
        condition:'brand-new',
        engine:'v8',
        transmission:'8-speed automatic',
        drivetrain:'AWD',
        fuel:'gas',
        exteriorcolor:'Blue',
        interiorcolor:'Magnolia',
        description:'The Flying Spur Azure brings together Bentley\'s exquisite hand craftsmanship with innovations in wellbeing technology to create a space that\'s awesome.'
        },
        
        {
        make:'Rolls Royce',
        model:'Phantom',
        year:'2023',
        price:550000,
        img:'https://i.ytimg.com/vi/l9zp2BBExuc/maxresdefault.jpg',
        inventory:'1',
        condition:'brand-new',
        engine:'v12',
        transmission:'8-speed automatic',
        drivetrain:'RWD',
        fuel:'gas',
        exteriorcolor:'Blue',
        interiorcolor:'White',
        description: 'Effortlessly poised and immaculately composed to give you the extra space within which to experience the pinnacle of luxury and automotive greatness.'
        },
        
        {
        make:'Alfa Romeo',
        model:'Stelvio Quadrifoglio',
        year:'2023',
        price:100000,
        img:'https://pictures.dealer.com/s/selectalfaromeofcaar/0825/02357a1c9e0349e25d74ed2abfdce362x.jpg',
        inventory:'1',
        condition:'brand-new',
        engine:'v6',
        transmission:'8-speed automatic',
        drivetrain:'AWD',
        fuel:'gas',
        exteriorcolor:'Ocra GT Tri-Coat',
        interiorcolor:'Black',
        description: 'Our 2023 Alfa Romeo Stelvio Quadrifoglio Q4 will catch everyone\'s attention in Ocra GT Tri-Coat! Powered by a Twin-turbocharged 2.9 Liter V6 designed by Ferrari producing 505hp paired with an 8 Speed Automatic transmission for exceptional performance. '
        },
        
        {
        make:'Porsche',
        model:'Panamera Platinum Edition',
        year:'2023',
        price:110000,
        img:'https://i.ytimg.com/vi/l9zp2BBExuc/maxresdefault.jpg',
        inventory:'1',
        condition:'brand-new',
        engine:'v6',
        transmission:'8-speed automatic',
        drivetrain:'RWD',
        fuel:'gas',
        exteriorcolor:'Volcano Grey Metallic',
        interiorcolor:'Black',
        description: 'As the pinnacle of the Porsche lineup the Panamera brings a cornucopia of luxuries to its occupants. Rich-smelling leathers, stainless steel accents, and fancy glass and wood trim elements give the interior a posh vibe that you and your family will enjoy.'
        },
        
        {
        make:'BMW',
        model:'740i Sedan',
        year:'2023',
        price:118000,
        img:'https://www.bmwusa.com/content/dam/bmwusa/common/vehicles/2022/my23/7-series/sedan/mdp/mobile/BMW-MY23-7Series-DetailPage-Hero-Mobile.jpg',
        inventory:'1',
        condition:'brand-new',
        engine:'3.0-liter BMW TwinPower Turbo inline 6-cylinder',
        transmission:'8-speed automatic',
        drivetrain:'RWD',
        fuel:'gas',
        exteriorcolor:'Black',
        interiorcolor:'Black',
        description: 'An entirely new generation of the 7-series, long BMW\'s flagship sedan and the brand\'s most luxurious and advanced product, has debuted for the 2023 model year. '
        },
        {
        make:'Genesis',
        model:'G90 3.5T',
        year:'2023',
        price:100000,
        img:'https://hips.hearstapps.com/hmg-prod/images/2023-genesis-g90-114-1659381781.jpg?crop=1.00xw:0.501xh;0,0.418xh&resize=768:*',
        inventory:'1',
        condition:'brand-new',
        engine:'v6',
        transmission:'8-speed automatic',
        drivetrain:'AWD',
        fuel:'gas',
        exteriorcolor:'Verbier White',
        interiorcolor:'Black Monotone',
        description: 'Heavenly ride quality, hushed cabin, and generous standard luxury features are in this beautiful 2023 Genesis G90.'
        },
        
        {
        make:'Chevrolet',
        model:'Corvette Z06',
        year:'2023',
        price:115000,
        img:'https://hips.hearstapps.com/hmg-prod/images/2023-chevrolet-corvette-z07-101-1664802216.jpg?crop=0.462xw:0.519xh;0.229xw,0.269xh&resize=768:*',
        inventory:'1',
        condition:'brand-new',
        engine:'v8',
        transmission:'8-speed automatic',
        drivetrain:'RWD',
        fuel:'gas',
        exteriorcolor:'Red',
        interiorcolor:'Black',
        description: 'The new Corvette Z06 receives a special engine that makes it sound like the supercars it\'s trying to dethrone. Its naturally aspirated 5.5-liter V-8 features a flat-plane crank and revs to 8500 rpm. '
        },
        
        {
        make:'Porsche',
        model:'911 GT3 RS',
        year:'2023',
        price:225000,
        img:'https://hips.hearstapps.com/hmg-prod/images/2023-porsche-911-gt3-rs-201-1660575621.jpg?crop=0.704xw:0.791xh;0.111xw,0.142xh&resize=768:*',
        inventory:'1',
        condition:'brand-new',
        engine:'v6',
        transmission:'7-speed automatic',
        drivetrain:'RWD',
        fuel:'gas',
        exteriorcolor:'Gray',
        interiorcolor:'Black',
        description: 'Simply put, the 2023 Porsche 911 GT# RS is utterly transcendent. With a naturally aspirated 4.0-liter flat-six engine and producing 518 horsepower you can glide in style without sacrificing any of the luxury you seek.'
        },
        
        {
        make:'McLaren',
        model:'Artura',
        year:'2023',
        price:250000,
        img:'https://hips.hearstapps.com/hmg-prod/images/2023-mclaren-artura3-6400f567986ad.jpg?crop=0.473xw:0.531xh;0.242xw,0.334xh&resize=768:* ',
        inventory:'1',
        condition:'brand-new',
        engine:'Hybrid v6',
        transmission:'8-speed automatic',
        drivetrain:'RWD',
        fuel:'gas',
        exteriorcolor:'Blue',
        interiorcolor:'White',
        description: 'McLaren embraces a hybridized future of high performance with the sculptural 2023 Artura supercar. Performance estimates are highlighted by a zero-to-60-mph time of 2.6 seconds and a top speed of 205 mph.'
        },
        
        {
        make:'Bentley',
        model:'Bentayga',
        year:'2023',
        price:215000,
        img:'https://hips.hearstapps.com/hmg-prod/images/bentayga-ewb-10-1652106996.jpg?crop=0.803xw:0.905xh;0.147xw,0.0440xh&resize=768:*',
        inventory:'1',
        condition:'brand-new',
        engine:'v8',
        transmission:'8-speed automatic',
        drivetrain:'AWD',
        fuel:'gas',
        exteriorcolor:'Champagne',
        interiorcolor:'Camel',
        description: 'Room for the whole family! This model comes with a rear-wheel steering system which helps shrink the SUV\'s turning radius.'
        },
        
        {
        make:'Audi',
        model:'R8 Coupe',
        year:'2023',
        price:225000,
        img:'https://hips.hearstapps.com/hmg-prod/images/2023-audi-r8-gt-front-three-quarters-motion-3-1664827965.jpg?crop=0.595xw:0.668xh;0.0705xw,0.224xh&resize=768:*',
        inventory:'1',
        condition:'brand-new',
        engine:'v10',
        transmission:'7-speed automatic',
        drivetrain:'AWD',
        fuel:'gas',
        exteriorcolor:'Skyblue',
        interiorcolor:'Onyx',
        description: 'Effortlessly poised and immaculately composed to give you the extra space within which to experience the pinnacle of luxury and automotive greatness. Inside its spacious rear cabin, you can melt into a tranquil haven that is yours — and yours alone.'
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
  },
  {
    user_id:3,
    transactioncomplete:false
  },
  {
    user_id:4,
    transactioncomplete:false
  },
  {
    user_id:5,
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
        },
        {
          cart_id:3,
          vehicle_id:1,
          quantity:10
        },
        {
          cart_id:3,
          vehicle_id:1,
          quantity:10
        },
        {
          cart_id:4,
          vehicle_id:1,
          quantity:10
        },
        {
          cart_id:4,
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