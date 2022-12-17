import React, { useState } from "react";
import { redirect } from "react-router";
import { useNavigate } from 'react-router-dom';
import '../static/styles.css'
import Navbar from "../components/nav-bar";


const LandingPage = (props) => {
    const navigate = useNavigate();

    function openDashboard () {
        console.log('open Dashboard Clicked')
        navigate('/dashboard');
    }

    return (
        <>
        <Navbar renderDrawerButton={false}/>
        <main className='landing-container'>
            <article className='font-mono'>
                <h1 className='text-3xl'>Kafka Compass</h1>
                <p className='my-7'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </article>
            <button className="btn" onClick={openDashboard}>Navigate to Dashboard</button>
        </main>
        </>
    )
}

export default LandingPage