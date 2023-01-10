import React, { useContext } from "react";
import { NavbarContext } from "../NavbarContext";
import homeIcon from "../static/homeIcon.png";

const Navbar = ({ navigate, logUserOut }) => {
  const { setAuthMode } = useContext(NavbarContext).authModeState;
  const { renderDrawerButton, setRenderDrawerButton } =
    useContext(NavbarContext).drawerButtonsState;
  const { loggedIn, setLoggedIn } = useContext(NavbarContext).loggedState;

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
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a>
              <label htmlFor="my-drawer">Select Metrics</label>
            </a>
          </li>
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
          <img
            src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png"
            alt="home icon"
            width="16"
            height="16"
          ></img>
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
          <img
            src="https://cdn-icons-png.flaticon.com/512/1946/1946488.png"
            alt="home icon"
            width="16"
            height="16"
          ></img>
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
    <>
      <div className="navbar">
        <div className="flex-1 flex-wrap grow-[2]">{drawerButtons}</div>
        <div className="flex-1 justify-end overflow-auto flex-wrap">
          {logButtons}
        </div>
      </div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">{drawerButtons}</div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">KafkaCompass</a>
        </div>
        <div className="navbar-end">{logButtons}</div>
      </div>
    </>
  );
};

export default Navbar;
