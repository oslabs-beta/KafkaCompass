import React, { Component, useState } from 'react';
import {
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import DashboardContainer from './containers/dashboard-container';
import LandingPage from './containers/landing-page-container';
import NotFound from './containers/NotFound';
import Navbar from './components/nav-bar';
import Auth from './containers/auth';
import './static/styles.css';

function App() {
  const navigate = useNavigate();
  const [renderDrawerButton, setDrawerButton] = useState(false);
  const [authMode, setDisplayAuth] = useState('');

  return (
    <div>
      <Navbar navigate={navigate} 
              setDisplayAuth={setDisplayAuth} 
              renderDrawerButton={renderDrawerButton} />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route exact path='/dashboard' element={<DashboardContainer  setDrawerButton={setDrawerButton} />} />
        <Route exact path='/auth' element={<Auth 
                                                 authMode={authMode} 
                                                 navigate={navigate}
                                                 setDisplayAuth={setDisplayAuth}
                                                 setDrawerButton={setDrawerButton} />} />
        <Route exact path='/' element={<LandingPage navigate={navigate} setDrawerButton={setDrawerButton} />} />
      </Routes>
    </div>
  );
}

export default App;
