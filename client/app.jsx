import React, { useMemo, useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { NavbarContext } from './NavbarContext';
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

  // shared navigation bar state
  const providerValue = {
    drawerButtonsState: useMemo(() => ({renderDrawerButton, setRenderDrawerButton}), [renderDrawerButton, setRenderDrawerButton]),
    loggedState: useMemo(() => ({loggedIn, setLoggedIn}), [loggedIn, setLoggedIn]),
    authModeState: useMemo(() => ({authMode, setAuthMode}), [authMode, setAuthMode]),
    userState: useMemo(() => ({user, setUser}), [user, setUser])
  };
  const [metricIndex, setMetricIndex] = useState(-1);
  const [metric, setMetric] = useState({});

  const checkSession = async () => {
    try {
      const response = await fetch("/api/authenticate", {
        method: "GET",
      });
      if (response.ok) {
        let session = await response.json();
      }
      console.log(errorMessage);
    } catch (err) {
      // console.log('Network error occurred - User not logged in');
    }
  };

  const logUserOut = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
      });
      if (response.ok) {
        setUser({});
        setLoggedIn(false);
      }
    } catch (err) {
      console.log(
        "Network error in attempting to logout - user not logged out"
      );
    }
  };

  useEffect(() => {
    if(metric.created_at){
      user.metric.push(metric)
      setUser(user);
    }
  }, [metric])

  return (
    <NavbarContext.Provider value={providerValue}>
      <Navbar navigate={navigate} logUserOut={logUserOut} />
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route
          exact
          path="/dashboard"
          element={
            checkLoggedIn ? (
              <DashboardContainer
                metrics={user.metric.at(metricIndex)}
                setMetric={setMetric}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          exact
          path="/auth"
          element={
            <Auth navigate={navigate} />
          }
        />
        <Route
          exact
          path="/cluster-history"
          element={<ClusterHistory setDrawerButton={setDrawerButton} metrics={user.metric} setMetricIndex={setMetricIndex}/>}
        />
        <Route
          exact
          path="/"
          element={
            <LandingPage
              navigate={navigate}
            />
          }
        />
      </Routes>
    </NavbarContext.Provider>
  );
}

export default App;
