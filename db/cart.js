
const client = require("./client")

async function createCart({user_id,total_price,date_purchased,transactioncomplete}){
    try{
const{rows:[cart]}= await client.query(`
INSERT INTO cart(user_id,total_price,date_purchased,transactioncomplete)
VALUES($1,$2,$3,$4)
RETURNING *
`,[user_id,total_price,date_purchased,transactioncomplete])
    }catch(error){
        console.log(error,"error creating cart")
    }
}
module.exports={
    createCart
}