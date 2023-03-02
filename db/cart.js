const client = require("./client")

async function createCart({user_id,date_purchased,transactioncomplete}){
    try{
const{rows:[cart]}= await client.query(`
INSERT INTO cart(user_id,date_purchased,transactioncomplete)
VALUES($1,$2,$3)
RETURNING *
`,[user_id,date_purchased,transactioncomplete])
return cart
    }catch(error){
        console.log(error,"error creating cart")
    }
}
module.exports={
    createCart
}