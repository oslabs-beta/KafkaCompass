import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './containers/landing-page-container';

function App () {
    return (
        <div>
            App!
            <Routes>
                <Route exact path = '/' element={LandingPage} />
            </Routes>
        </div>
    )
}

export default App;