import NavBar from './NavBar';
import Search from './Search';
import Footer from './Footer';
import Carousel from './Carousel';
import CarCarousel from './CarCarousel';


const Home = props => {
    return (
        <div>
            <NavBar />
            <Search />
            <Carousel />
            <CarCarousel />
            <Footer />
        </div>
    )
};

export default Home; 