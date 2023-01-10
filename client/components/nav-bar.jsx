import React, { useContext } from "react";
import { NavbarContext } from "../NavbarContext";

const Navbar = ({ navigate, logUserOut }) => {
  const { setAuthMode } = useContext(NavbarContext).authModeState;
  const { renderDrawerButton, setRenderDrawerButton } =
    useContext(NavbarContext).drawerButtonsState;
  const { loggedIn, setLoggedIn } = useContext(NavbarContext).loggedState;

  let drawerButtons = <></>;

  if (renderDrawerButton) {
    drawerButtons = (
      <>
        <label htmlFor="my-drawer" className="btn drawer-button mr-10 my-7">
          Select Metrics
        </label>
        <label htmlFor="my-modal-4" className="btn btn-outline mr-10 my-7">
          Add New Cluster
        </label>
        <label htmlFor="switch-cluster-modal" className="btn btn-outline">
          Switch Cluster
        </label>
      </>
    );
  }

  let logButtons = <></>;
  if (loggedIn === false) {
    logButtons = (
      <>
        <button
          onClick={() => {
            setAuthMode("signup");
            navigate("/auth");
          }}
          className="btn btn-outline mr-10 my-7"
        >
          Sign Up
        </button>
        <button
          onClick={() => {
            setAuthMode("login");
            navigate("/auth");
          }}
          className="btn btn-accent btn-outline mr-10 my-7"
        >
          Log In{" "}
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
          className="btn btn-outline mr-10 my-7"
        >
          Home
        </button>

        <button
          onClick={() => {
            logUserOut();
            setRenderDrawerButton(false);
            setLoggedIn(false);
            navigate("/");
          }}
          className="btn btn-outline mr-10 my-7"
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <>
      <div className="navbar">
        <div className="flex-1 flex-wrap grow-[2]">{drawerButtons}</div>
        <div className="flex-1 justify-end overflow-auto flex-wrap">
          {logButtons}
        </div>
      </div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost normal-case text-xl">
              Cluster
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Add</a>
              </li>
              <li>
                <a>Switch</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">KafkaCompass</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
