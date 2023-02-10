import React, { useContext, useRef } from "react";
import { NavbarContext } from "../NavbarContext";
import AboutUs from "./about-us.jsx";
import LogoWithoutText from "../static/logo_without_text.png";
import KafkaCompassPerformanceStatsDemo from "../static/KafkaCompassPerformanceStatsDemo.gif";
import contentMonitoringScreenshot from "../static/contentMonitoringScreenshot.png";
import "../static/styles.css";

const LandingPage = ({ navigate }) => {
  const { loggedIn } = useContext(NavbarContext).loggedState;

  document.body.style.backgroundImage =
    "linear-gradient(to right, white, rgb(113, 165, 246))";

  // Using useRef hook to set smooth scrolling for the "About Us" component
  const myRef = useRef(null);
  const infoRef = useRef(null);
  const executeScroll = () => {
    myRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const executeScrollToInfo = () => {
    infoRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="h-screen p-16 xl:mx-60 lg:mx-28 md:px-4 md:pb-8 sm:pb-64 sm:mb-72">
        <div className="flex-1 justify-around">
          <article className="font-mono overflow-auto">
            <img className="icon-logo my-2" src={LogoWithoutText} />
            <h2 className="page-title text-lg">Kafka Compass</h2>
            <p className="text-justify text-lg sm:break-normal">
              Welcome to KafkaCompass: an open source tool to make your Kafka
              experience easier. KafkaCompass will be your navigator while
              working with Confluent Cloud. Get performance and content
              statistics to monitor your Kafka cluster, view messages in your
              topics, and check your cluster's history snapshots to see how you
              cluster's performance changed over time. All you need to get
              started is a running Kafka cluster in your Confluent Cloud. Create
              an account and start monitoring!
            </p>
          </article>
          <div className="flex justify-around">
            <div className="landing-buttons my-3 flex md:flex-col">
              <form action="https://github.com/oslabs-beta/KafkaCompass">
                <button className="btn btn-outline"> Github Repository </button>
              </form>
              <button onClick={executeScrollToInfo} className="btn btn-outline">
                Learn More
              </button>
              <button
                className="landing-buttons my-3 btn btn-outline"
                onClick={() => {
                  if (loggedIn) navigate("/dashboard");
                  else navigate("/auth");
                }}
              >
                Navigate to Dashboard
              </button>
            </div>
          </div>
          <article>
            <h2 className="page-title">
              <i>
                Don't get lost navigating your Kafka clusters - grab a compass!
              </i>
            </h2>
          </article>
          <div className="flex justify-around">
            <button onClick={executeScroll} className="btn btn-outline">
              Meet the team
            </button>
          </div>
        </div>
      </div>
      <div>
        <article
          ref={infoRef}
          className="flex-1 flex-row justify-around py-10 px-10 lgmax:flex-col-reverse"
        >
          <div className="lgmax:pt-10">
            <img
              className="rounded-lg"
              src={KafkaCompassPerformanceStatsDemo}
            ></img>
          </div>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                View an advanced suite of cluster metrics in Performance
                Statistics
              </h2>
              <p>
                <i>
                  Metrics are securely encrypted and stored for later reference
                  in your personalized Cluster History page
                </i>
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        </article>
        <article className="flex-1 flex-row justify-around pb-0 px-10 lgmax:flex-col">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">
                Monitor and modify the content of your cluster in Content
                Monitoring
              </h2>
              <p>
                <i>
                  Take control of your cluster, with the ability to add and
                  delete topics, write messages, and consume messages, simply at
                  the click of a button
                </i>
              </p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
          <div className="lgmax:pt-10">
            <img
              className="rounded-lg"
              src={contentMonitoringScreenshot}
              height="1000px"
              width="600p"
            ></img>
          </div>
        </article>
      </div>
      <div ref={myRef} className="flex justify-around">
        <AboutUs />
      </div>
    </>
  );
};

export default LandingPage;
