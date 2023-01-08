import React, { useMemo, useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { NavbarContext } from "./NavbarContext";
import DashboardContainer from "./containers/dashboard-container";
import LandingPage from "./containers/landing-page-container";
import NotFound from "./containers/NotFound";
import Navbar from "./components/nav-bar";
import Auth from "./containers/auth";
import "./static/styles.css";

function App() {
  const navigate = useNavigate();
  const [renderDrawerButton, setRenderDrawerButton] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [authMode, setAuthMode] = useState("");
  const [sideBarMode, setSideBarMode] = useState("current");
  const [dashboardMode, setDashboardMode] = useState("viewCluster");
  const [metricIndex, setMetricIndex] = useState(-1);
  const [metric, setMetric] = useState({});

  // shared navigation bar state
  const providerValue = {
    drawerButtonsState: useMemo(
      () => ({ renderDrawerButton, setRenderDrawerButton }),
      [renderDrawerButton, setRenderDrawerButton]
    ),
    loggedState: useMemo(
      () => ({ loggedIn, setLoggedIn }),
      [loggedIn, setLoggedIn]
    ),
    authModeState: useMemo(
      () => ({ authMode, setAuthMode }),
      [authMode, setAuthMode]
    ),
    userState: useMemo(() => ({ user, setUser }), [user, setUser]),
    dashboardState: useMemo(
      () => ({ dashboardMode, setDashboardMode }),
      [dashboardMode, setDashboardMode]
    ),
    sideBarState: useMemo(
      () => ({ sideBarMode, setSideBarMode }),
      [sideBarMode, setSideBarMode]
    ),
    metricState: useMemo(() => ({ metric, setMetric }), [metric, setMetric]),
    metricIndexState: useMemo(
      () => ({ metricIndex, setMetricIndex }),
      [metricIndex, setMetricIndex]
    )
  };

  const checkSession = async () => {
    try {
      const response = await fetch("/api/authenticate", {
        method: "GET"
      });
      if (response.ok) {
        const user = await response.json();
        setLoggedIn(true);
        setUser(user);
      } else {
        setLoggedIn(false);
        setUser({});
      }
    } catch (err) {
      // console.log('Network error occurred - User not logged in');
    }
  };

  const logUserOut = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET"
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
    if (metric.created_at) {
      user.metric.push(metric);
      setUser(user);
    }
  }, [metric]);

  useEffect(() => {
    checkSession();
  },[])

  return (
    <NavbarContext.Provider value={providerValue}>
      <Navbar navigate={navigate} logUserOut={logUserOut} />
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route
          exact
          path="/dashboard"
          element={loggedIn ? <DashboardContainer /> : <Navigate to="/" />}
        />
        <Route exact path="/auth" element={<Auth navigate={navigate} />} />
        <Route exact path="/" element={<LandingPage navigate={navigate} />} />
      </Routes>
    </NavbarContext.Provider>
  );
}

export default App;
