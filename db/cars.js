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

async function getAllCars() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM cars;`);
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
async function updateCars({ id, ...fields }) {
  try {
    let { name, description } = fields;
    if (!name) {
      const {
        rows: [cars],
      } = await client.query(
        `
        UPDATE cars
        SET description=$1
        WHERE id=${id}
        RETURNING *
        `,
        [description]
      );
      return cars;
    } else if (!description) {
      const {
        rows: [cars],
      } = await client.query(
        `
        UPDATE cars
        SET name=$1
        WHERE id=${id}
        RETURNING *
        `,
        [name]
      );
      return cars;
    } else {
      const {
        rows: [cars],
      } = await client.query(
        `
          UPDATE cars
          SET name=$1,description=$2
          WHERE id=${id}
          RETURNING *
          `,
        [name, description]
      );
      return cars;
    }
  } catch (error) {
    throw error;
  }
}
async function deleteCars(id) {
  try {
    await client.query(
      `
          DELETE FROM cars
          WHERE "routineId" = $1;
          `,
      [id]
    );
    const { rows: cars } = await client.query(
      `
          DELETE FROM cars
          WHERE id = $1
          `,
      [id]
    );
    return cars;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  createCar,
  getAllCars,
  getCarsById,
  updateCars,
  deleteCars,
};
