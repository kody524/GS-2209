import React, { useState,useEffect } from 'react';
import ItemsCarousel from 'react-items-carousel';
import { getAllCars } from '../allApiCalls';

function CarCarousel() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const[cars,setCars]=useState([])
  const chevronWidth = 40;
  useEffect(() => {
    getAllCars(setCars).then(cars);
    },[]);
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={5}
        gutter={20}
        leftChevron={<button>{'<'}</button>}
        rightChevron={<button>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
      >
      {
        cars.map(car=>{
            return(<>
                <div style={{ height: 200, background: '#EEE' }}>
                    <img src={car.img} alt='' style={{height: 200,width:350}}/>
                </div>
           </> )
        })
      }
      </ItemsCarousel>
    </div>
  );
};

export default CarCarousel;