import NavBar from './NavBar';
import Search from './Search';
import Footer from './Footer';
import Carousel from './Carousel';
import styles from './Home.module.css'

const Home = ({loginSuccess}) => {
   
    return (
        <div className={styles.container}>
            <NavBar loginSuccess={loginSuccess}/>
            <Search />
            <Carousel />
            <Footer />
        </div>
    )
};

export default Home; 