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
  const [renderDrawerButton, setRenderDrawerButton] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [authMode, setAuthMode] = useState('');

  const checkSession = async () => {
        
    try {
        const response = await fetch('/api/authenticate', {
            method: 'GET',
        });
        if (response.ok) {
            let session = await response.json();
            if (session.user !== undefined) {
            // console.log('this is session', session.user);
            setUser(session.user);
            setLoggedIn(true);
            }
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
        setLoggedIn(false);
      }
       } catch(err) {
        console.log('Network error in attempting to logout - user not logged out')
      }
      
  }

  useEffect(() => {
      checkSession();
    });

  return (
    <div>
      <Navbar navigate={navigate} 
              setAuthMode={setAuthMode} 
              loggedIn={loggedIn}
              renderDrawerButton={renderDrawerButton}
              setRenderDrawerButton={setRenderDrawerButton}
              setLoggedIn={setLoggedIn}
              logUserOut={logUserOut} 
              />
      <Routes>
        <Route path='*' element={<NotFound />} />

          <Route exact path='/dashboard' element={loggedIn ? <DashboardContainer  
          setRenderDrawerButton={setRenderDrawerButton} 
          loggedIn={loggedIn}
          user={user}
          /> : <Navigate to='/'/>} />

        <Route exact path='/auth' element={<Auth 
                                                 authMode={authMode} 
                                                 navigate={navigate}
                                                 setAuthMode={setAuthMode}
                                                 setRenderDrawerButton={setRenderDrawerButton}
                                                 setLoggedIn={setLoggedIn}
                                                 setUser={setUser}
                                                  />} />
        <Route exact path='/cluster-history' element={<ClusterHistory 
                                                      setRenderDrawerButton={setRenderDrawerButton} 
                                                      />}/>
        <Route exact path='/' element={<LandingPage navigate={navigate} setRenderDrawerButton={setRenderDrawerButton} setLoggedin={setLoggedIn} setUser={setUser} loggedIn={loggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
