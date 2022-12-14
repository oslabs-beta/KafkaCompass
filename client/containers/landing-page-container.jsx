import React, { useState } from "react";
import { redirect } from "react-router";
import { useNavigate } from 'react-router-dom';

const LandingPage = (props) => {
    const navigate = useNavigate();

    function openDashboard () {
        console.log('open Dashboard Clicked')
        navigate('/dashboard');
    }

    return (
        <div >
            <h1>LandingPage!</h1>
            <button onClick={openDashboard}>Navigate to Dashboard</button>
        </div>
    )
}

export default LandingPage