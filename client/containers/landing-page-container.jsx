import React, { useState } from "react";
import { redirect } from "react-router";
import { useNavigate } from 'react-router-dom';

const LandingPage = (props) => {
    const navigate = useNavigate();

    return (
        <div >
            LandingPage!
            <button onClick={navigate('/dashboard')}>Navigate to Dashboard</button>
        </div>
    )
}

export default LandingPage