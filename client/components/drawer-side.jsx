import React, { useContext } from "react";
import { NavbarContext } from "../NavbarContext";

const DrawerSide = ({ metricSelection, updateSideDrawer }) => {
  const { sideBarMode, setSideBarMode } =
    useContext(NavbarContext).sideBarState;

  const { setDashboardMode } = useContext(NavbarContext).dashboardState;
  const { metricIndex, setMetricIndex } =
    useContext(NavbarContext).metricIndexState;

  const choices = {
    retained_bytes: "Retained Bytes",
    sent_bytes: "Sent Bytes",
    received_records: "Received Records",
    sent_records: "Sent Records",
    request_bytes: "Request Bytes",
    response_bytes: "Response Bytes",
    request_count: "Request Counts",
    req_res: "Request/Response bytes"
  };

  const listItems = Object.keys(choices).map((key) => (
    <li
      key={key}
      onClick={() => {
        updateSideDrawer(key);
        // if we switched to history mode but have not choosen the snapshot,
        // and now we whant to back to the chart on current cluster
        if (sideBarMode === "history" && metricIndex === -1) {
          setSideBarMode("current");
          setDashboardMode("performanceStatistics");
        }
      }}
      className={metricSelection === key ? "bg-blue-800 text-white" : ""}
    >
      <a>{choices[key]}</a>
    </li>
  ));

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-base-100 text-base-content">
        {listItems}
        <div className="divider"></div>
        <li
          key="Cluster History"
          onClick={() => {
            setSideBarMode("history");
            setDashboardMode("clusterHistory");
          }}
        >
          <a>Cluster History</a>
        </li>
        {sideBarMode === "history" && (
          <li
            key="Current Metric"
            onClick={() => {
              setSideBarMode("current");
              setDashboardMode("performanceStatistics");
              setMetricIndex(-1);
            }}
          >
            <a>Back to current cluster</a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DrawerSide;
