import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Item from './Item';
import slider from '../helper/carousel.json';


function hero() {

    return (
        <Carousel>
            {
                slider.map( (item, i) => <Item key={item.id} item={item} /> )
            }
        </Carousel>
    )
};



export default hero;