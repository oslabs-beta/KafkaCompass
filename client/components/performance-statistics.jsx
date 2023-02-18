import React, { useState, useContext } from "react";
import { NavbarContext } from "../NavbarContext";
import TableData from "../components/table-data";
import Chart from "../components/chart";

const PerformanceStatistics = ({
  chartData,
  metricSelection,
  tableData,
  updateSideDrawer
}) => {
  const { setMetric } = useContext(NavbarContext).metricState;
  async function updateMetrics() {
    console.log("doing the thing");
    const response = await fetch("/api/metric");
    const metric = await response.json();

    setMetric(metric);
  }

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
    <>
      <div class="grid grid-cols-6">
        <div className="border">
          <ul class="menu border bg-base-100 menu-compact lg:menu-normal">
            <b>Metrics</b>
            {listItems}
            <li>
              <a>
                <label onClick={updateMetrics}>
                  <b>Update Metrics</b>
                </label>
              </a>
            </li>
            <li
              key="Cluster History"
              onClick={() => {
                setSideBarMode("history");
                setDashboardMode("clusterHistory");
              }}
            >
              <a>
                <b>Cluster History</b>
              </a>
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
                <a>
                  <b>Back to current cluster</b>
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="border col-span-3">
          {chartData && (
            <>
              <Chart chartData={chartData} metricSelection={metricSelection} />
            </>
          )}
        </div>
        <div className="border col-span-2">
          <TableData tableData={tableData} />
        </div>
      </div>
    </>
  );
};

export default PerformanceStatistics;
