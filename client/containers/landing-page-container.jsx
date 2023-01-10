import React, { useContext, useRef } from "react";
import { NavbarContext } from "../NavbarContext";
import AboutUs from "./about-us.jsx";
import "../static/styles.css";

const LandingPage = ({ navigate }) => {
  const { loggedIn } = useContext(NavbarContext).loggedState;

  const myRef = useRef(null);

  const executeScroll = () => {
    myRef.current.scrollIntoView({behavior: "smooth"})
  }

  return (
  <><div className="first-page">
    <div className="landing-container">
      <article className="font-mono">
        <h1 className="text-3xl">Kafka Compass</h1>
        <p className="my-7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </article>
      <div className="landing-buttons">
      <button
        className="btn"
        onClick={() => {
          if (loggedIn) navigate("/dashboard");
          else navigate("/auth");
        }}
      >
        Navigate to Dashboard
      </button>
      <button className="btn" onClick={executeScroll}>Meet the team</button>
      </div>
    </div>
  </div>
  
    <div ref={myRef}>
      <AboutUs />
    </div> </>
  );
};

export default LandingPage;
