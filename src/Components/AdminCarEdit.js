// import React, {useState} from 'react';
// import { Button } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';
// import { editCar } from "../allApiCalls"


// const AdminEditCar = ({car, token}) => {
//     const history = useHistory();
//     // const [make, setMake] = useState(car.make);
//     // const [model, setModel] = useState(car.model);
//     // const [make, setMake] = useState(car.make);
//     // const [make, setMake] = useState(car.make);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const data = await editCar(make,model,year,price,inventory,condition,engine,transmission,drivetrain,fuel,exteriorcolor,interiorcolor,description);
//         history.push('/cars');
//     }

//     return (
//         <>
//             <h2></h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                 <input type="text"
//                     placeholder="Car Make"
//                     value={make}
//                     onChange={(event) => setMake(event.target.value)}
//                 ></input>
//                 <input type="text"
//                     placeholder="Car Model"
//                     value={model}
//                     onChange={(event) => setModel(event.target.value)}
//                 ></input>
//                 <input type="text"
//                     placeholder="Car Year"
//                     value={make}
//                     onChange={(event) => setYear(event.target.value)}
//                 ></input>
//                 <input type="text"
//                     placeholder="Price"
//                     value={price}
//                     onChange={(event) => setPrice(event.target.value)}
//                 ></input>
//                 <input type="number"
//                     placeholder="Inventory"
//                     value={inventoryQuantity}
//                     onChange={(event) => setPrice(event.target.value)}
//                 ></input>
//                 <div id="form">
//                 </div>
//                 <input
//                     type="text"
//                     value={image}
//                     onChange={(event) => setImage(event.target.value)}
//                 ></input>
//                 </div>
//                 <Button variant="contained">Submit Changes</Button>
//             </form>
//         </>
//         );
//         }
//         export default AdminEditCar;