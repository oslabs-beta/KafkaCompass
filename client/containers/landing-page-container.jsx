import React, { useState, useRef } from "react";
import { useForm } from 'react-hook-form'
import { redirect } from "react-router";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/nav-bar';
import Auth from './auth';
import '../static/styles.css'


const LandingPage = (props) => {
    const navigate = useNavigate();
    const {register, handleSubmit } = useForm();
    const [username, setUsername] = useState('');
    const [displayLogin, setDisplayLogin] = useState(false);

    function openDashboard () {
        navigate('/dashboard');
    }


    const onLogin = async data => {
        try {
            const response = await fetch('/api/login');
            const data = await response.json();
            console.log(data);
        } catch(err) {
            console.log('Login failed');
        }
        setUsername(data.username);
    }

    const handleLogin = () => {
        setDisplayLogin(true);
    }
 
    return (
        <>
        <Navbar handleLogin={handleLogin}  renderDrawerButton={false}/>
        <main className='landing-container'>
            <article className='font-mono'>
                <h1 className='text-3xl'>Kafka Compass</h1>
                <p className='my-7'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </article>
            <button className="btn" onClick={openDashboard}>Navigate to Dashboard</button>

            {displayLogin && <Auth register={register} setDisplayLogin={setDisplayLogin} onLogin={onLogin} handleSubmit={handleSubmit} /> }
        </main>
        </>
    )
}

export default LandingPage