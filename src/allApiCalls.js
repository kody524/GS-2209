

  async function register (username,password,email,firstname,lastname,street,city,state,zip,phone,isadmin){
try{
const response = await fetch('http://localhost:8080/api/users/register',{
  method:"POST",
  headers:{
    "Content-Type": "application/json",
  },
  body:JSON.stringify({
    username:username,
    password:password,
    email:email,
    firstname:firstname,
    lastname:lastname,
    street:street,
    city:city,
    state:state,
    zip:zip,
    phone:phone,
    isadmin:isadmin
  })
})
const data = await response.json()
alert(data.message)

}catch(e){
  console.log(e,"register error")
}
}
 async function login(username,password,setSuccess){
  try{
const response = await fetch("http://localhost:8080/api/users/login",
{
  method:"POST",
  headers:{
    "Content-Type": "application/json",
  },
  body:JSON.stringify({
    username:username,
    password:password
  }),
}
)
const json = await response.json()
console.log(json)
if (json.message === "Successful Login") {
  alert(json.message);
  setSuccess(true)
  localStorage.setItem("token", json.token);
  localStorage.setItem("user", json.user.username);
}else{
  alert(json.message)
}

  }catch(e){
    console.log(e,"error logging in")
  }
}


 async function getMe(token){
  try{
const response = await fetch('http://localhost:8080/api/users/me',
{
  headers:{
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },

})
const data = await response.json();

  }catch(e){
    console.log(e,"error getting profile")
  }
}
 async function editUser(token,username, password, email, firstname, lastname, street, city, state, zip, phone){
  try{
const data = await fetch("http://localhost:8080/api/users/me",
{
  method:"PATCH",
  headers:{
    "Content-Type": "application/json",
  },
  body:JSON.stringify({
    username:username,
    password:password,
    email:email,
    firstname:firstname,
    lastname:lastname,
    street:street,
    city:city,
    state:state,
    zip:zip,
    phone:phone
  })
})
const response = await data.json()

  }catch(e){
    console.log(e,"error updating info")
  }
}
 async function deleteUser(token){
  try{
const response = await fetch("http://localhost:8080/api/users/me",
{
  method:"DELETE",
  headers:{
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }
})
const data = await response.json()
alert(data.message)
  }catch(e){
    console.log(e,"error deleting profile")
  }
}
 async function getAllCars(setCars){
  try{
    const response = await fetch('http://localhost:8080/api/cars',
    {
      headers:{
          "Content-Type": "application/json",
      },
    }
    
    );
    const data = await response.json();
    setCars(data)
  }catch(error){
      console.log(error,"error getting cars")
  }
}
 async function getSingleCar(carId){
  try{
const data = await fetch(`http://localhost:8080/api/cars/${carId}`,
{
  headers:{
    "Content-Type": "application/json",
  }
})
const response = await data.json()
  }catch(e){
    console.log(e,"error getting car")
  }
}
 async function addCar(  make,
  model,
  year,
  price,
  inventory,
  condition,
  engine,
  transmission,
  drivetrain,
  fuel,
  exteriorcolor,
  interiorcolor,
  description,){
  try{
const data = await fetch("http://localhost:8080/api/cars",
{
  method:"POST",
  headers:{
    "Content-Type": "application/json",
  },
  body:JSON.stringify({
    make:make,
    model:model,
    year:year,
    price:price,
    inventory:inventory,
    condition:condition,
    engine:engine,
    transmission:transmission,
    drivetrain:drivetrain,
    fuel:fuel,
    exteriorcolor:exteriorcolor,
    interiorcolor:interiorcolor,
    description:description
  }),
})
const response  = await data.json();
alert(response.message)
  }catch(e){
    console.log(e,"error creating car")
  }
}
 async function editCar(carId,make,
  model,
  year,
  price,
  inventory,
  condition,
  engine,
  transmission,
  drivetrain,
  fuel,
  exteriorcolor,
  interiorcolor,
  description){
  try{
const data = await fetch(`http://localhost:8080/api/cars/${carId}`,
{
  method:"PATCH",
  headers:{
    "Content-Type": "application/json",
  },
  body:JSON.stringify({
    make:make,
    model:model,
    year:year,
    price:price,
    inventory:inventory,
    condition:condition,
    engine:engine,
    transmission:transmission,
    drivetrain:drivetrain,
    fuel:fuel,
    exteriorcolor:exteriorcolor,
    interiorcolor:interiorcolor,
    description:description
  })
})

const response = await data.json();

  }catch(e){
    console.log(e,"error updating car ")
  }
}
 async function deleteCar(carId){
  try{
const data = await fetch(`http://localhost:8080/api/cars/${carId}`,
{
  method:"DELETE",
  headers:{
    "Content-Type": "application/json",
  }
})
const response = await data.json()
  }catch(e){
    console.log(e,"error deleting car")
  }
}
 async function getCart(userId){
try{
const data = await fetch(`http://localhost:8080/api/cart/${userId}`,
{
  headers:{
    "Content-Type": "application/json",
  }
})
const response = await data.json()
}catch(e){
  console.log(e,"error getting cart")
}
}
 async function updateCart(userId,date_purchased,transactioncomplete){
  try{
const data = await fetch(`http://localhost:8080/api/cart/${userId}`,
{
  method:"PATCH",
  headers:{
    "Content-Type": "application/json",
  },
  body:JSON.stringify({
date_purchased:date_purchased,
transactioncomplete:transactioncomplete
  })
})
  }catch(e){
    console.log(e,"error updating cart")
  }
}
 async function deleteCart(cartId){
  try{
const data = await fetch(`http://localhost:8080/api/cart/${cartId}`,
{
  method:"DELETE",
  headers:{
    "Content-Type": "application/json",
  }
})
const response = await data.json();
  }catch(e){
    console.log(e,"error deleting cart")
  }
}
 async function updateCartItems(cartItemId,quantity){
  try{
const data = await fetch(`http://localhost:8080/api/cart/${cartItemId}`,
{
  method:"PATCH",
  headers:{
    "Content-Type": "application/json",
  },
  body:JSON.stringify({
    quantity:quantity
  })
})
const response = await data.json()
  }catch(e){
    console.log(e,"error updating cart items")
  }
}
 async function deleteCartItem(cartItemId){
  try{
const data = await fetch(`http://localhost:8080/api/cart/${cartItemId}`,
{
  method:"DELETE",
  headers:{
    "Content-Type": "application/json",
  }
})
const response = await data.json();
  }catch(e){
    console.log(e,"error deleting cart item")
  }
}

module.exports={
  register,
  login,
  getMe,
  editUser,
  deleteUser,
  getAllCars,
  getSingleCar,
addCar,
editCar,
deleteCar,
getCart,
updateCart,
deleteCart,
updateCartItems,
deleteCartItem
}