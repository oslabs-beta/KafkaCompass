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
            <h1>LandingPage!</h1>
            <button className="bg-sky-600 hover:bg-sky-700 px-5 py-3 text-white rounded-lg text-3xl">THIS IS A TEST BUTTON</button>
            <button className="btn">DAISY UI BUTTON</button>
            <button onClick={openDashboard}>Navigate to Dashboard</button>
        </div>
    )
}

export default LandingPage