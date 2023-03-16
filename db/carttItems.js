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
async function getCartItemsByCartId(cart_id) {
    
    try {
        const {rows: cartItems} = await client.query(`
        SELECT cart_items.*, cars.make,cars.model,cars.price FROM cart_items
        JOIN cars ON cars.id=cart_items.vehicle_id
        WHERE cart_id =$1;
        `, [cart_id]);
        
        return cartItems;
    } catch (error) {
        throw error;
    }
}
async function updateCartItem({cartItemId, quantity}) {
    
    try {
        const {rows: [cartItem]} = await client.query(`
            UPDATE cart_items
            SET quantity = $1
            WHERE id = $2
            RETURNING *;
        `, [ cartItemId,quantity]);
        return cartItem;
    } catch (error) {
        throw error;
    }
}
async function deleteCartItem(vehicle_id) {
    try {
        const {rows: [cartItem]} = await client.query(`
            DELETE FROM cart_items
            WHERE vehicle_id = $1
            RETURNING *;
        `, [vehicle_id]);
        return cartItem;
    } catch (error) {
        throw error;
    }
}


module.exports={
    addItemsToCart,
    getCartItemsByCartId,
    updateCartItem,
    deleteCartItem
}