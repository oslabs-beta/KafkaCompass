import React, { useContext } from "react";
import { NavbarContext } from "../NavbarContext";
import logoWithoutText from "../static/logo_without_text.png";

const Navbar = ({ navigate, logUserOut }) => {
  const { setAuthMode } = useContext(NavbarContext).authModeState;
  const { renderDrawerButton, setRenderDrawerButton } =
    useContext(NavbarContext).drawerButtonsState;
  const { loggedIn, setLoggedIn } = useContext(NavbarContext).loggedState;
  // dictates the view mode on dashbaord
  const { dashboardMode, setDashboardMode } =
    useContext(NavbarContext).dashboardState;
  // modifies the performance mode menu in the case of looking at historical metrics
  const { sideBarMode, setSideBarMode } =
    useContext(NavbarContext).sideBarState;
  // functions for switching mode of the dashboard
  function changeModePerformanceStatistics() {
    setDashboardMode("performanceStatistics");
  }
  function changeModeContentMonitoring() {
    setDashboardMode("contentMonitoring");
  }
  function changeModeSnapshotComparison() {
    setDashboardMode("snapshotComparison");
  }

  let drawerButtons = <></>;

  if (renderDrawerButton) {
    drawerButtons = (
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost normal-case text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black"
        >
          <b>View Modes</b>
          <li
            className={
              dashboardMode === "performanceStatistics"
                ? " bg-blue-800 text-white"
                : ""
            }
            onClick={changeModePerformanceStatistics}
          >
            <a>Performance Statistics</a>
          </li>
          <li
            className={
              dashboardMode === "contentMonitoring"
                ? " bg-blue-800 text-white"
                : ""
            }
            onClick={changeModeContentMonitoring}
          >
            <a>Content Monitoring</a>
          </li>
          <li
            className={
              dashboardMode === "clusterHistory"
                ? " bg-blue-800 text-white"
                : ""
            }
            key="Cluster History"
            onClick={() => {
              setSideBarMode("history");
              setDashboardMode("clusterHistory");
            }}
          >
            <a>Cluster History</a>
          </li>
          <li
            className={
              dashboardMode === "snapshotComparison"
                ? " bg-blue-800 text-white"
                : ""
            }
            onClick={changeModeSnapshotComparison}
          >
            <a>Snapshot Comparison</a>
          </li>
          <b>Cluster Options</b>
          <li>
            <a>
              <label htmlFor="my-modal-4">Add New Cluster</label>
            </a>
          </li>
          <li>
            <a>
              <label htmlFor="switch-cluster-modal">Switch Cluster</label>
            </a>
          </li>
        </ul>
      </div>
    );
  }

  let logButtons = <></>;
  if (loggedIn === false) {
    logButtons = (
      <>
        <button
          onClick={() => {
            setRenderDrawerButton(false);
            navigate("/");
          }}
          className="btn btn-ghost btn-circle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 32 32"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"
            ></path>
          </svg>
        </button>
        <button
          onClick={() => {
            setAuthMode("signup");
            navigate("/auth");
          }}
          className="btn btn-ghost normal-case text-l"
        >
          Sign Up
        </button>
        <button
          onClick={() => {
            setAuthMode("login");
            navigate("/auth");
          }}
          className="btn btn-ghost normal-case text-l"
        >
          Login
        </button>
      </>
    );
  } else {
    logButtons = (
      <>
        <button
          onClick={() => {
            setRenderDrawerButton(false);
            navigate("/");
          }}
          className="btn btn-ghost btn-circle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 32 32"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M32 18.451l-16-12.42-16 12.42v-5.064l16-12.42 16 12.42zM28 18v12h-8v-8h-8v8h-8v-12l12-9z"
            ></path>
          </svg>
        </button>
        <button
          onClick={() => {
            logUserOut();
            setRenderDrawerButton(false);
            setLoggedIn(false);
            navigate("/");
          }}
          className="btn btn-ghost normal-case text-l"
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <div className="navbar bg-blue-800 text-white">
      <div className="navbar-start">{drawerButtons}</div>
      <div className="navbar-end">{logButtons}</div>
      <img className="h-12" src={logoWithoutText} alt="Kafka logo" />
    </div>
  );
};

export default Navbar;
