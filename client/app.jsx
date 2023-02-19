import React, { useMemo, useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { NavbarContext } from "./NavbarContext";
import DashboardContainer from "./containers/dashboard-container";
import LandingPage from "./containers/landing-page-container";
import NotFound from "./containers/NotFound";
import Navbar from "./components/nav-bar";
import Auth from "./containers/auth";
import Footer from "./components/footer";
import "./static/styles.css";

function App() {
  // using useNavigate hook to navigate between routes
  const navigate = useNavigate();

  // navigation bar and mode-related state
  const [renderDrawerButton, setRenderDrawerButton] = useState(false);
  const [sideBarMode, setSideBarMode] = useState("current");
  const [dashboardMode, setDashboardMode] = useState("performanceStatistics");

  // user-related state:
  // user data from the backend
  // variable to check if user is logged in
  // if user is not logged in, what authentification form we need to render
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState("");

  // metric-related state (for loading data for cluster)
  const [metricIndex, setMetricIndex] = useState(-1);
  // holder for data -> metric is the part of user state to force the re-render when user updates metrics
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
      const response = await fetch("/api/authenticate");
      if (response.ok) {
        const session = await response.json();
        if (session.auth) {
          setLoggedIn(true);
          setUser(session.user);
        } else {
          setLoggedIn(false);
          setUser({});
        }
      } else {
        setLoggedIn(false);
        setUser({});
      }
    } catch (err) {
      // If try-catch block fails Network error occurred
    }
  };

  const logUserOut = async () => {
    try {
      const response = await fetch("/api/logout");
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

  // if data on cluster was updated, useEffect updates user state with new metrics
  useEffect(() => {
    if (metric.created_at) {
      user.metric.push(metric);
      setUser(user);
    }
  }, [metric]);

  // if user gets updated, set metric's index to -1 (we switch user to the current cluster)
  useEffect(() => {
    setMetricIndex(-1);
  }, [user]);

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <NavbarContext.Provider value={providerValue}>
      <main className="flex flex-col min-h-screen">
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
      </main>
      <Footer />
    </NavbarContext.Provider>
  );
}

export default App;
