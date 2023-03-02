const client = require("./client")

async function addItemsToCart({cart_id,vehicle_id,quantity}){
    try{
const{rows:[cart]}= await client.query(`
INSERT INTO cart_items(cart_id,vehicle_id,quantity)
VALUES($1,$2,$3)
RETURNING *;
`,[cart_id,vehicle_id,quantity])
return cart
    }catch(error){
        console.log(error,"error adding items")
    }
}
module.exports={
    addItemsToCart
}