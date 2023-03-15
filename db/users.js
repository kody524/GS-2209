const client = require("./client");



// database functions

// user functions
async function createUser({ username, hashedPassword, email, firstname, lastname, street, city, state, zip, phone,isadmin}) {
 
    try{
    
     
     const { rows:[user] } = await client.query(`
      INSERT INTO users(username,password, email, firstname, lastname, street, city, state, zip, phone,isadmin)
      VALUES($1,$2, $3, $4, $5, $6, $7, $8, $9, $10,$11)
      RETURNING *;
      `,[username,hashedPassword, email, firstname, lastname, street, city, state, zip, phone,isadmin]);

     delete user.password
      return user;
      
    }catch(error){
      console.log(error, 'failed to create user')
  }


}
  

async function getAllUsers() {
 
  try{
  
   
   const { rows } = await client.query(`
    SELECT * FROM users;
    `);

   delete rows.password
   
    return rows;
    
  }catch(error){
    console.log(error, 'failed to create user')
}


}



  



async function getUserById(userId) {
  try{
    const { rows: [userById] } = await client.query(`
    SELECT * 
    from users 
    WHERE id=$1
    `,[userId])
  //  console.log(userById)
    delete userById.password
    return userById;

  }catch(error){
    console.log('Failed to get user by Id')
  }

}

async function getUserByUsername(userName) {
 
  try{
    const { rows: [user]} = await client.query(`
    SELECT * 
    from users 
    WHERE username=$1
    `,[userName])

    return user;
  }catch(error){
    
    console.log(error)
  }
}

  async function getUserByEmail(email){
    try{
const {rows:[user]}= await client.query(`
SELECT * FROM users
WHERE email=$1
`,[email])
return user
    }catch(error){
      console.log(error)
    }
  }


async function updateUsersInfo(id, fields = {}) {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(", ");
    if (setString.length === 0) {
      return;
    }
    try {
      const {
        rows: [user],
      } = await client.query(
        `
              UPDATE users
              SET ${setString}
              WHERE id=${id}
              RETURNING *;
            `,
        Object.values(fields)
      );
  
      return user;
    } catch (error) {
      throw error;
    }
  }
async function deleteAccount(id){
    try{
const {rows:user}= await client.query(`
DELETE FROM users
WHERE id=$1
`,[id])
return user
    }catch(error){
      throw error
    }
}



module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  getUserByUsername,
  updateUsersInfo,
  deleteAccount,
  getUserByEmail,
}
