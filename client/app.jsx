import React, { Component, useState, useEffect } from 'react';
import {
  Route,
  Routes,
  useNavigate,
  Navigate
} from 'react-router-dom';
import DashboardContainer from './containers/dashboard-container';
import LandingPage from './containers/landing-page-container';
import NotFound from './containers/NotFound';
import Navbar from './components/nav-bar';
import Auth from './containers/auth';
import ClusterHistory from './containers/cluster-history';
import './static/styles.css';

function App() {
  const navigate = useNavigate();
  const [renderDrawerButton, setDrawerButton] = useState(false);
  const [checkLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [authMode, setDisplayAuth] = useState('');

  const checkSession = async () => {
        
    try {
        const response = await fetch('/api/authenticate', {
            method: 'GET',
        });
        if (response.ok) {
            let session = await response.json();
            setUser(session.user);
        }
        console.log(errorMessage);
      } catch(err) {
        // console.log('Network error occurred - User not logged in');
      }
    }

    const logUserOut = async () => {
      try {
      const response = await fetch('/api/logout', {
        method: 'GET'
      });
      if (response.ok) {
        setUser({});
      }
       } catch(err) {
        console.log('Network error in attempting to logout - user not logged out')
      }
      
  }

  useEffect(() => {
      checkSession();
     }, [user]);

  return (
    <div>
      <Navbar navigate={navigate} 
              setDisplayAuth={setDisplayAuth} 
              checkLoggedIn={checkLoggedIn}
              renderDrawerButton={renderDrawerButton}
              setDrawerButton={setDrawerButton}
              setLoggedIn={setLoggedIn}
              logUserOut={logUserOut} 
              />
      <Routes>
        <Route path='*' element={<NotFound />} />

          <Route exact path='/dashboard' element={checkLoggedIn ? <DashboardContainer  
          setDrawerButton={setDrawerButton} 
          checkLoggedIn={checkLoggedIn}
          user={user}
          /> : <Navigate to='/'/>} />

        <Route exact path='/auth' element={<Auth 
                                                 authMode={authMode} 
                                                 navigate={navigate}
                                                 setDisplayAuth={setDisplayAuth}
                                                 setDrawerButton={setDrawerButton}
                                                 setLoggedIn={setLoggedIn}
                                                 setUser={setUser}
                                                  />} />
        <Route exact path='/cluster-history' element={<ClusterHistory setDrawerButton={setDrawerButton} />}/>
        <Route exact path='/' element={<LandingPage navigate={navigate} setDrawerButton={setDrawerButton} setLoggedin={setLoggedIn} setUser={setUser} checkLoggedIn={checkLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
