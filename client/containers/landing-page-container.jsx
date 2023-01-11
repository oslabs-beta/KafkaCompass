import React, { useContext, useRef } from "react";
import { NavbarContext } from "../NavbarContext";
import AboutUs from "./about-us.jsx";
import LogoWithoutText from "../static/logo_without_text.png";
import "../static/styles.css";

const LandingPage = ({ navigate }) => {
  const { loggedIn } = useContext(NavbarContext).loggedState;

  document.body.style.backgroundImage =
    "linear-gradient(to right, white, rgb(113, 165, 246))";

  // Using useRef hook to set smooth scrolling for the "About Us" component
  const myRef = useRef(null);
  const executeScroll = () => {
    myRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="first-page">
        <div className="landing-container">
          <article className="font-mono">
            <img className="icon-logo my-2" src={LogoWithoutText} />
            <h2 className="page-title text-lg ">Kafka Compass</h2>
            <p className="text-justify text-lg">
              Welcome to KafkaCompass: an open source tool to make your Kafka
              experience easier. KafkaCompass will be your navigator while
              working with Confluent Cloud. Get performance and content
              statistics to monitor your Kafka cluster, view messages in your
              topics, and check your cluster's history snapshots to see how you
              cluster's performance changed over time. All you need to get
              started is a running Kafka cluster in your Confluent Cloud. Sign
              up and start monitoring!
            </p>
          </article>
          <div className="landing-buttons my-3">
            <button
              className="btn btn-outline"
              onClick={() => {
                if (loggedIn) navigate("/dashboard");
                else navigate("/auth");
              }}
            >
              Navigate to Dashboard
            </button>
            <button className="btn btn-outline" onClick={executeScroll}>
              Meet the team
            </button>
          </div>
        </div>
      </div>
      <div ref={myRef}>
        <AboutUs />
      </div>
    </>
  );
};

export default LandingPage;
