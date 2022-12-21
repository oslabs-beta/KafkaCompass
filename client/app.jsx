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
  const [displayAuthenticated, setDisplayAuthenticated] = useState(false);
  const [authMode, setDisplayAuth] = useState('');

  const checkSession = async () => {
    try {
        const response = await fetch('/api/authenticate', {
            method: 'GET',
        });
        console.log('check session response', response);
        if (response.ok) {
            const session = await response.json();
            if (session.user !== undefined) {
            setUser(session.user);
            setLoggedIn(true);
            localStorage.setItem("token", session.token);
            } 
        }
      } catch(err) {
        console.log('Network error occurred - User not logged in');
      }
    }

    const verifyUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setDisplayAuthenticated(false);
        return;
      }
      try {
        const response = await fetch('/api/authenticate', {
          method: "GET",
          headers: {
            "x-access-token": localStorage.getItem("token"),
          }
        })
        if (response.ok) {
          const session = await response.json()
          if (session.authenticated) {
          setLoggedIn(true);
          setUser(session.user);
          setDisplayAuthenticated(true);
          } else {
            setLoggedIn(false);
            setDisplayAuthenticated(false);
          }
        }
    } catch(err) {
      console.log('user is not authenticated')
    }
  }

    const logUserOut = async () => {
      localStorage.removeItem("token");
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
    }, [checkLoggedIn]);

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
                                                 verifyUser={verifyUser}
                                                  />} />
        <Route exact path='/cluster-history' element={<ClusterHistory setDrawerButton={setDrawerButton} />}/>
        <Route exact path='/' element={<LandingPage navigate={navigate} setDrawerButton={setDrawerButton} setLoggedin={setLoggedIn} setUser={setUser} checkLoggedIn={checkLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;
