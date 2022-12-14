import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './containers/landing-page-container';

const appStyle = {
  color: 'red',
  fontSize: '40px',
};

function App() {
  return (
    <div style={appStyle}>
      App!
      <Routes>
        <Route exact path='/' element={LandingPage} />
      </Routes>
    </div>
  );
}

export default App;
