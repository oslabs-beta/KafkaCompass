import React, { useContext, useRef, useState } from "react";
import { NavbarContext } from "../NavbarContext";
import AboutUs from "./about-us.jsx";
import LogoWithoutText from "../static/logo_without_text.png";
import KafkaCompassPerformanceStatsDemo from "../static/KafkaCompassPerformanceStatsDemo.gif";
import contentMonitoringScreenshot from "../static/contentMonitoringScreenshot.png";
import "../static/styles.css";
import AboutUsCards from "../components/card";
import logoWithoutText from "../static/logo_without_text.png";

//placeholder
// const navigation = [
//   { name: "Product", href: "#" },
//   { name: "Features", href: "#" },
//   { name: "Marketplace", href: "#" },
//   { name: "Company", href: "#" }
// ];

import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const LandingPage = ({ navigate }) => {
  const { setAuthMode } = useContext(NavbarContext).authModeState;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const { loggedIn } = useContext(NavbarContext).loggedState;

  // document.body.style.backgroundImage =
  //   "linear-gradient(to right, white, rgb(113, 165, 246))";

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
    <div className="isolate bg-white">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#9b2541ea-d39d-499b-bd42-aeea3e93f5ff)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="9b2541ea-d39d-499b-bd42-aeea3e93f5ff"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="px-6 pt-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">KafkaCompass</span>
              <img
                className="h-8"
                src={logoWithoutText}
                alt="KafkaCompass Logo"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {/* <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div> */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              style={{ cursor: "pointer" }}
              onClick={() => {
                setAuthMode("login");
                navigate("/auth");
              }}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <Dialog.Panel className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">KafkaCompass</span>
                <img
                  className="h-8"
                  src={logoWithoutText}
                  alt="KafkaCompass logo (menu)"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {/* <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                    >
                      {item.name}
                    </a>
                  ))}
                </div> */}
                <div className="py-3">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setAuthMode("signup");
                      navigate("/auth");
                    }}
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                  >
                    Sign up
                  </a>
                </div>
                <div className="py-3">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setAuthMode("login");
                      navigate("/auth");
                    }}
                    className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </div>
      <main>
        <div className="relative py-10 sm:py-14 lg:pb-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Don't get lost navigating your Kafka clusters. <br></br> Grab a
                compass!
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Welcome to KafkaCompass: an open source tool to make your Kafka
                experience easier. KafkaCompass will be your navigator while
                working with Confluent Cloud. Get performance and content
                statistics to monitor your Kafka cluster, view messages in your
                topics, and check your cluster's history snapshots to see how
                you cluster's performance changed over time. All you need to get
                started is a running Kafka cluster in your Confluent Cloud.
                Create an account and start monitoring!
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setAuthMode("signup");
                    navigate("/auth");
                  }}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={executeScroll}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Meet the team <span aria-hidden="true"> &darr;</span>
                </a>
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
            <svg
              className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
            >
              <path
                fill="url(#b9e4a85f-ccd5-4151-8e84-ab55c66e5aa1)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="b9e4a85f-ccd5-4151-8e84-ab55c66e5aa1"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#9089FC" />
                  <stop offset={1} stopColor="#FF80B5" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div ref={myRef} className="flex flex-col justify-around">
          <h3 className="text-center text-5xl font-semibold text-gray-900 mb-7">
            Meet the team
          </h3>
          {/* <AboutUs /> */}
          <AboutUsCards />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;

/*
  
  
  
  

  return (
    <>
      <div className="h-screen p-16 xl:mx-60 lg:mx-28 md:px-4 md:pb-8 md:mb-72 sm:pb-64 sm:mb-72">
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

*/
