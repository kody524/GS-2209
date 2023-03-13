const client = require("./client")
const{getCartItemsByCartId}=require('./carttItems')

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
        const {rows:[cart]} = await client.query(`
            SELECT *
            FROM cart
            WHERE user_id = $1;
        `, [userId]);
        
        return getCartItemsByCartId(cart.id)
    } catch (error) {
        console.log(error);
    }
}
async function getAllCarts() {
    try {
        const {rows: [carts]} = await client.query(`
        SELECT cart_items.cart_id,cart_items.quantity,cars.make,cars.model, cars.price
        FROM cart_items JOIN cars ON cars.id=cart_items.vehicle_id
        JOIN cart ON cart.id=cart_items.cart_id
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
    getAllCarts,
    getCartsByUser,
    deleteCart
}