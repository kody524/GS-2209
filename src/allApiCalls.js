export async function getAllCars(setCars){
    try{
      const response = await fetch('http://localhost:3000/api/cars',
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