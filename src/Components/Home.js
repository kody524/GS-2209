import NavBar from './NavBar';
import Search from './Search';
import Footer from './Footer';
import Carousel from './Carousel';


const Home = ({loginSuccess}) => {
   
    return (<>
        
            <NavBar loginSuccess={loginSuccess}/>
           
            <Carousel />
           
       
            </>)
};

export default Home; 