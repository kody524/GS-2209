const client = require("./client")

async function createCart({user_id,transactioncomplete}){
    try{
const{rows:[cart]}= await client.query(`
INSERT INTO cart(user_id,transactioncomplete)
VALUES($1,$2)
RETURNING *
`,[user_id,transactioncomplete])
return cart
    }catch(error){
        console.log(error,"error creating cart")
    }
}

async function updateCart({cartId,date_purchased,transactioncomplete}){
    try{
const{rows:cart}= await client.query(`
UPDATE cart
SET date_purchased=$1,transactioncomplete=$2
WHERE id=$3
`,[cartId,date_purchased,transactioncomplete])
    }catch(error){
        throw error
    }
}
async function getCartsByUser(userId) {
    try {
        const {rows: carts} = await client.query(`
            SELECT *
            FROM carts
            WHERE user_id = $1;
        `, [userId]);
        return carts;
    } catch (error) {
        throw error;
    }
}
async function getAllCarts() {
    try {
        const {rows: [carts]} = await client.query(`
            SELECT *
            FROM cart
        `);
       
        return carts;
    } catch (error) {
        throw error;
    }
}
async function deleteCart(cartId) {
    try {
        const {rows: [cart]} = await client.query(`
            DELETE FROM cart
            WHERE cart_id = $1
            RETURNING *;
        `, [cartId]);
        return cart;
    } catch (error) {
        throw error;
    }
}

module.exports={
    createCart,
    updateCart,
    deleteCart
}