import React, { useState } from "react";
import { redirect } from "react-router";
import { useNavigate } from 'react-router-dom';
import '../static/styles.css'

const LandingPage = (props) => {
    const navigate = useNavigate();

    function openDashboard () {
        console.log('open Dashboard Clicked')
        navigate('/dashboard');
    }

    return (
        <div>
            <div className="navbar bg-neutral text-neutral-content flex-row">
            <a className="btn btn-ghost normal-case text-4xl shadow-outline text-red-200">KafkaCompass</a>
            <a className="btn btn-ghost normal-case text-5xl order-2 text-gray-800">About</a>
            <a className="btn btn-ghost normal-case text-sm order-4">Login/SignUp</a>
            </div>
            <h1>LandingPage!</h1>
            <button className="btn btn-main shadow">THIS IS A TEST BUTTON</button>
            <button class="btn btn-main">DAISY UI BUTTON</button>
            <button onClick={openDashboard}>Navigate to Dashboard</button>
        </div>
    )
}

export default LandingPage