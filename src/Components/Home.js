import NavBar from './NavBar';
import Footer from './Footer';
import Carousel from './Carousel';
import CarCarousel from './CarCarousel';


const Home = props => {
    return (
        <div>
            <NavBar />
            <Carousel />
            <CarCarousel />
            <Footer />
        </div>
    )
};

export default Home; 