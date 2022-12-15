import React, { Component, useState } from 'react';
import {
  redirect,
  Route,
  Routes,
  useNavigate,
  NavLink,
  Switch,
} from 'react-router-dom';
import DashboardContainer from './containers/dashboard-container';
import LandingPage from './containers/landing-page-container';
import NotFound from './containers/NotFound';
import Navbar from './components/nav-bar';
import './static/styles.css';

function App() {
  const navigate = useNavigate();
  // function openDashboard () {
  //     console.log('clicked')
  //     useNavigate('/dashboard');
  // }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route exact path='/dashboard' element={<DashboardContainer />} />
        <Route exact path='/' element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
