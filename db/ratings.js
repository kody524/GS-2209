const client = require("./client")

async function createRatings({userid,vehicleid,review,stars}){
    try {
      const{rows:[rating]}=await client.query(`
      INSERT INTO ratings(userid,vehicleid,review,stars)
      VALUES($1,$2,$3,$4)
      RETURNING *
      `,[userid,vehicleid,review,stars]);
    return rating;
    } catch (error) {
      console.log(error,"error creating ratings");
    }
  }

async function getRatingsByUser(id) {
    try {
        const {rows: ratings} = await client.query(`
        SELECT *
        FROM ratings
        WHERE "userId" = $1;
        `, [id]);
        return ratings;  
    } catch (error) {
        throw error;
    }
}

async function getRatingsByCar(id) {
  try {
      const {rows: ratings} = await client.query(`
      SELECT *
      FROM ratings
      JOIN users ON ratings.userId = users.id
      WHERE vehicleId = $1;
      `, [id]);
      return ratings;  
  } catch (error) {
      throw error;
  }
}

async function deleteRating(id) {
  try {
      const { rows: [ rating ] } = await client.query(`
      DELETE FROM ratings
      WHERE id=$1
      RETURNING *;
      `, [id]);
      return rating;  
  } catch (error) {
      throw error;
  }
}
  module.exports = {
    createRatings,
    getRatingsByCar,
    getRatingsByUser,
    deleteRating
  }