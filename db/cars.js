const client = require("./client");

async function createCar({
  make,
  model,
  year,
  price,
  img,
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
INSERT INTO cars(make,model,year,price,img,condition,engine,transmission,drivetrain,fuel,exteriorcolor,interiorcolor,description)
VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
RETURNING *
`,
      [
        make,
        model,
        year,
        price,
        img,
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

async function getAllCars() {
  try {
    const { rows } = await client.query(`
    SELECT * FROM cars`
        );
        
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getCarsById(id) {
  try {
    const {
      rows: [cars],
    } = await client.query(`
  SELECT * FROM cars
  WHERE id=${id};  
    `);

    return cars;
  } catch (error) {
    throw error;
  }
}
async function updateCars(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");
  if (setString.length === 0) {
    return;
  }
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            UPDATE cars
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
          `,
      Object.values(fields)
    );

    return user;
  } catch (error) {
    throw error;
  }
}

async function deleteCars(carId) {
  try {
    await client.query(`
    DELETE FROM cart_items
            WHERE vehicle_id = $1
    `,[carId])
  await client.query(`
  DELETE FROM ratings
  WHERE vehicleId=$1
  `,[carId])
    const { rows: cars } = await client.query(
      `
          DELETE FROM cars
          WHERE id = $1
          `,
      [carId]
    );
    return cars;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  createCar,
  getAllCars,
  getCarsById,
  updateCars,
  deleteCars,
};
