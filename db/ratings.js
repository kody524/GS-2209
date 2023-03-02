const client = require("./client")

async function createRatings({userid,vehicleid,review,stars}){
    try{
const{rows:[rating]}=await client.query(`
INSERT INTO ratings(userid,vehicleid,review,stars)
VALUES($1,$2,$3,$4)
RETURNING *
`,[userid,vehicleid,review,stars])
return rating
    }catch(error){
      console.log(error,"error creating ratings")
    }
  }
  module.exports = {
    createRatings
  }