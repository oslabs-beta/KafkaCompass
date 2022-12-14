import React, { Component, useState } from 'react';
import { redirect, Route, Routes, useNavigate, NavLink } from 'react-router-dom';
import LandingPage from './containers/landing-page-container';

function App () {
    // const navigate = useNavigate();
    // function openDashboard () {
    //     console.log('clicked')
    //     useNavigate('/dashboard');
    // }

    return (
        <div>
            <NavLink to='/dashboard'>Dashboard</NavLink>
            App!!
            <Routes>
                <Route exact path = '/' element={<LandingPage/>} />
                <Route exact path = '/dashboard' element={<div>dashboard</div>} />
            </Routes>
        </div>
    )
}

export default App;