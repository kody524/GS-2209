const client = require("./client");

async function createCar({
  make,
  model,
  year,
  price,
  inventory,
  condition,
  engine,
  transmission,
  drivetrain,
  fuel,
  exteriorcolor,
  interiorcolor,
  description,
}) {
  try {
    const {
      rows: [car],
    } = await client.query(
      `
INSERT INTO cars(make,model,year,price,inventory,condition,engine,transmission,drivetrain,fuel,exteriorcolor,interiorcolor,description)
VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
RETURNING *
`,
      [
        make,
        model,
        year,
        price,
        inventory,
        condition,
        engine,
        transmission,
        drivetrain,
        fuel,
        exteriorcolor,
        interiorcolor,
        description,
      ]
    );
    return car;
  } catch (error) {
    console.log(error, "error creating car");
  }
}

async function getAllCars(){
    try{
        const{rows}= await client.query(`
        SELECT * FROM cars;`)
        return rows } catch(error){
            throw error
        }
    }
async function getCarsbyId(){try{
    const{rows:[cars]}= await client.query(`
  SELECT * FROM cars
  WHERE id=${id};  
    `)
    
    return cars
  }catch(error){
    throw error
  }
  
  }
async function updateCars ({})
async function deleteCars ({})
module.exports = {
  createCar,
  getAllCars,
  getCarsbyId,
  updateCars,
  deleteCars,
};
