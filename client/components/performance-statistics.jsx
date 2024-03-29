import React, { useState, useContext } from "react";
import { NavbarContext } from "../NavbarContext";
import TableData from "../components/table-data";
import Chart from "../components/chart";

const PerformanceStatistics = ({
  chartData,
  metricSelection,
  tableData,
  updateSideDrawer,
  clusterId,
  snapshotTime
}) => {
  const { setMetric } = useContext(NavbarContext).metricState;
  async function updateMetrics() {
    const response = await fetch("/api/metric");
    if (response.ok) {
      const metric = await response.json();
      setMetric(metric);
    } else console.log("Could not update metrics");
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
        // if we switched to history mode but have not chosen the snapshot,
        // and now we what to back to the chart on current cluster
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
          <ul class="menu border bg-base-100 menu-compact lg:menu-normal h-screen bg-slate-100">
            <span className="pl-4 pt-3 pb-3">
              <b>Metric Views</b>
            </span>
            {listItems}
            <li>
              <a>
                <label onClick={updateMetrics}>
                  <b>Update Metrics</b>
                </label>
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
          <table className="table w-full">
            <thead>
              <th className="flex justify-around text-l">
                <b>Performance Statistics</b>
              </th>
            </thead>
          </table>
          <h1 className="flex justify-around text-l pb-5 pt-5">
            <b>Cluster: {clusterId}</b> <b>Snapshot: {snapshotTime}</b>
          </h1>
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
