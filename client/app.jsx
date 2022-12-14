import React, { Component, useState } from 'react';
import { redirect, Route, Routes, useNavigate, NavLink } from 'react-router-dom';
import DashboardContainer from './containers/dashboard-container';
import LandingPage from './containers/landing-page-container';

function App () {
    const navigate = useNavigate();
    // function openDashboard () {
    //     console.log('clicked')
    //     useNavigate('/dashboard');
    // }

    return (
        <div>
            App!!
            <div>
            <NavLink to='/dashboard'>Link to Dashboard</NavLink>
            </div>
            <Routes>
                <Route exact path = '/' element={<LandingPage/>} />
                <Route exact path = '/dashboard' element={<DashboardContainer />} />
            </Routes>
        </div>
    )
}

export default App;