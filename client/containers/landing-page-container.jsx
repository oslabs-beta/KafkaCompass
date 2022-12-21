import React, { useState, useRef, useEffect } from "react";
import { redirect } from "react-router";
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/nav-bar';
import Auth from './auth';
import '../static/styles.css'


const LandingPage = ({navigate, checkLoggedIn}) => {

    return (
        <main className='landing-container'>
            <article className='font-mono'>
                <h1 className='text-3xl'>Kafka Compass</h1>
                <p className='my-7'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </article>
            <button className="btn" onClick={() => {
                                        if (checkLoggedIn) navigate('/dashboard');
                                        else navigate('/auth');
                                    }}>Navigate to Dashboard</button>
        </main>
    )
}

export default LandingPage