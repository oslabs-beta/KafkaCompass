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
    const [displayAuth, setDisplayAuth] = useState({display: false, mode: ''});

    function openDashboard () {
        navigate('/dashboard');
    }


    const onLogin = async data => {
        try {
            await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    username: data.username,
                    password: data.password
                })
            });
            setUsername({username: data.username});
            setDisplayLogin(false);
        } catch(err) {
            console.log('Login failed');
        }
    }

    const onSignup = () => {
        console.log('sign up');
    }

    // when button for sign uo or log in is clicked, app displays authorization form
    // if login form should be displayed, we set mode to login
    // if sign up form should be displayed, we set mode to sign up
    const handleAuth = mode => {
        setDisplayAuth({display: true, mode: mode});
    }

 
    return (
        <>
        <Navbar handleAuth={handleAuth}  renderDrawerButton={false}/>
        <main className='landing-container'>
            <article className='font-mono'>
                <h1 className='text-3xl'>Kafka Compass</h1>
                <p className='my-7'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </article>
            <button className="btn" onClick={openDashboard}>Navigate to Dashboard</button>

            {displayAuth.display && <Auth 
                                mode={displayAuth.mode}
                                register={register} 
                                setDisplayAuth={setDisplayAuth} 
                                onLogin={onLogin} 
                                onSignup={onSignup}
                                handleSubmit={handleSubmit} /> }
        </main>
        </>
    )
}

export default LandingPage