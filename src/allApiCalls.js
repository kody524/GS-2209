

export async function register (username,password,email,firstname,lastname,street,city,state,zip,phone,setSuccess){
try{
const response = await fetch('https://a-8g40.onrender.com//api/users/register',{
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
    phone:phone
  })
})
const data = await response.json()
alert(data.message)
if(data.message==="Thanks for signing up!"){
setSuccess(true)
}

}catch(e){
  console.log(e,"register error")
}
}
export async function getAllUsers(setUsers){
  try{
const response = await fetch(`https://a-8g40.onrender.com//api/users`,
{
  headers:{
    "Content-Type": "application/json",
  },
 
  })
  const data = await response.json()
  setUsers(data)
}catch(error){
    console.log(error)
  }
}

export  async function login(username,password,setLoginSuccess,setToken,setUserId){
  try{
const response = await fetch("https://a-8g40.onrender.com//api/users/login",
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
  setLoginSuccess(true)
  setToken(json.token)
  setUserId(json.user)
  localStorage.setItem("token", json.token);
  localStorage.setItem("user", json.username);
  localStorage.setItem("id", json.user)
  if(json.isadmin){
    localStorage.setItem("isadmin",json.isadmin)
  }
}else{
  alert(json.message)
}

  }catch(e){
    console.log(e,"error logging in")
  }
}


export  async function getMe(token,setUser){
  try{
const response = await fetch('https://a-8g40.onrender.com//api/users/me',
{
  headers:{
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  },

})
const data = await response.json();
setUser(data)
  }catch(e){
    console.log(e,"error getting profile")
  }
}

export async function deleteUser(token){
  try{
const response = await fetch("https://a-8g40.onrender.com//api/users/me",
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
export  async function getAllCars(setCars){
  try{
    const response = await fetch("https://a-8g40.onrender.com//api/cars",
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
export async function getSingleCar(carId,setCar){
  try{
const data = await fetch(`https://a-8g40.onrender.com//api/cars/${carId}`,
{
  headers:{
    "Content-Type": "application/json",
  }
})
const response = await data.json()
setCar(response)
  }catch(e){
    console.log(e,"error getting car")
  }
}
export default async function addCar(  make,
  model,
  year,
  price,
  img,
  condition,
  engine,
  transmission,
  drivetrain,
  fuel,
  exteriorcolor,
  interiorcolor,
  description,){
  try{
const data = await fetch("https://a-8g40.onrender.com//api/cars",
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
    img:img,
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
export async function editCar(carId,make,
  model,
  year,
  price,
  img,
  condition,
  engine,
  transmission,
  drivetrain,
  fuel,
  exteriorcolor,
  interiorcolor,
  description){
  try{
const data = await fetch(`https://a-8g40.onrender.com//api/cars/${carId}`,
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
    img:img,
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
alert(response.message)

  }catch(e){
    console.log(e,"error updating car ")
  }
}
export async function deleteCar(carId){
  try{
const data = await fetch(`https://a-8g40.onrender.com//api/cars/${carId}`,
{
  method:"DELETE",
  headers:{
    "Content-Type": "application/json",
  }
})
const response = await data.json()
alert(response.message)
  }catch(e){
    console.log(e,"error deleting car")
  }
}
export async function getCart(userId,setCart){
try{
const data = await fetch(`https://a-8g40.onrender.com//api/cartitems/${userId}`,
{
  headers:{
    "Content-Type": "application/json",
  }
})
const response = await data.json()
if(!response.message){
setCart(response)
}

}catch(e){
  console.log(e,"error getting cart")
}
}
export async function addToCart(user_id,transactioncomplete,vehicle_id,quantity){
  console.log(user_id,vehicle_id,quantity,transactioncomplete)
  try{
const data = await fetch(`https://a-8g40.onrender.com//api/cart`,{
  method:"POST",
  headers:{
   
    "Content-Type": "application/json",
  },
  body:JSON.stringify({
    user_id:user_id,
    transactioncomplete:transactioncomplete,
    vehicle_id:vehicle_id,
    quantity:quantity
  })
})
const response = await data.json()
alert(response.message)
  }catch(e){
    console.log(e)
  }
}


 
export async function deleteCartItem(cartItemId){
  console.log(cartItemId)
  try{
const data = await fetch(`https://a-8g40.onrender.com//api/cartitems/${cartItemId}`,
{
  method:"DELETE",
  headers:{
    "Content-Type": "application/json",
  }
})
const response = await data.json();
alert(response.message)
  }catch(e){
    console.log(e,"error deleting cart item")
  }
}






