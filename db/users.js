const client = require("./client")

 async function createUser({ 
    username, 
    password,
    email,
    firstname,
    lastname,
    street,
    city,
    state,
    zip,
    phone
    }){

    try{
const{rows:[user]}= await client.query(`
INSERT INTO users (username,password,email,firstname,lastname,street,city,state,zip,phone)
VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
ON CONFLICT(username) DO NOTHING
RETURNING *;
`,[username,password,email,firstname,lastname,street,city,state,zip,phone])

return user
    }catch(error){
        console.log(error,"error creating user")
    }
}
module.exports={
    createUser
}

//getuser

//update user

//