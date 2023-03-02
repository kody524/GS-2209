import {Outlet} from 'react-router-dom'
import { useState } from 'react';
import Nav from './Nav';

const Home = () => {
    const [token, setToken] = useState(localStorage.getItem ("saved_token"));
    return (
        <div>
            <header>
                <Nav token = {token} setToken = {setToken}/>
            </header>
            <main>
                <Outlet context={[token, setToken]}/>
            </main>
        </div>
    )
}

export default Home