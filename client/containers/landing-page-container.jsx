import React, { useContext, useRef, useState } from "react";
import { NavbarContext } from "../NavbarContext";
import AboutUs from "./about-us.jsx";
import LogoWithoutText from "../static/logo_without_text.png";
import KafkaCompassPerformanceStatsDemo from "../static/KafkaCompassPerformanceStatsDemo.gif";
import contentMonitoringScreenshot from "../static/contentMonitoringScreenshot.png";
import "../static/styles.css";
import AboutUsCards from "../components/card";
import logoWithoutText from "../static/logo_without_text.png";
import KafkaCompassDashboardPic from "../static/KafkaCompassDashboard3.png";
import ContentMonitoringScreenshot from "../static/contentMonitoringScreenshot2.png";
import ClusterHistoryScreenshot from "../static/clusterHistoryScreenshot2.png";

import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const LandingPage = ({ navigate }) => {
  let carouselElement = useRef(); // carouselElement has to hold the HTMLElement of the carousel

  function scrollCarousel(targetImageNumber) {
    let carouselWidth = window.innerWidth * 0.94666;

    console.log("carouselWidth is ", carouselWidth);

    // Images are numbered from 1 to 4 so thats why we substract 1
    let targetImage = targetImageNumber - 1;
    console.log("targetImage is", targetImage);

    let targetXPixel = carouselWidth * targetImage + 8;
    console.log("targetXPixel is", targetXPixel);

    if (carouselElement.current) {
      carouselElement.current.scrollTo(targetXPixel, 0);
    }
  }

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
              <stop stopColor="#2d20f5" />
              <stop offset={1} stopColor="#1435f5" />
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
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Don't get lost navigating your Kafka clusters. <br></br> Grab a
                compass!
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Welcome to KafkaCompass: an open source web application to make
                your Kafka monitoring experience easier. KafkaCompass will be
                your navigator while working with Confluent Cloud. Get
                performance and content statistics to monitor your Kafka
                cluster, read and debug message streams, and check and compare
                historical cluster snapshots to track performance changes over
                time. All you need to get started is a running Kafka cluster in
                your Confluent Cloud. Create an account and start monitoring!
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
                  Create new account
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
            {/* <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src={KafkaCompassDashboard}
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div> */}

            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <div ref={carouselElement} className="carousel w-full">
                  <div id="item1" className="carousel-item w-full">
                    <img
                      src={KafkaCompassDashboardPic}
                      alt="App screenshot"
                      width={2432}
                      height={1442}
                      className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                    />
                  </div>
                  <div id="item2" className="carousel-item w-full mx-[14px]">
                    <img
                      src={ContentMonitoringScreenshot}
                      alt="App screenshot"
                      width={2432}
                      height={1442}
                      className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                    />
                  </div>
                  <div id="item3" className="carousel-item w-full">
                    <img
                      src={ClusterHistoryScreenshot}
                      alt="App screenshot"
                      width={2432}
                      height={1442}
                      className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center w-full py-2 gap-2 mt-4">
                <button
                  onClick={() => scrollCarousel(1)}
                  // href="#item1"
                  className="btn btn-xs min-h-0 w-2 h-2 btn-circle"
                ></button>
                <button
                  onClick={() => scrollCarousel(2)}
                  // href="#item2"
                  className="btn btn-xs min-h-0 w-2 h-2 btn-circle"
                ></button>
                <button
                  onClick={() => scrollCarousel(3)}
                  // href="#item3"
                  className="btn btn-xs min-h-0 w-2 h-2 btn-circle"
                ></button>
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
                  <stop stopColor="#2d20f5" />
                  <stop offset={1} stopColor="#1435f5" />
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
