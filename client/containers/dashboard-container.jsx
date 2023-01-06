import React, { useEffect, useState, useContext } from "react";
import AddClusterForm from "../components/add-cluster-form";
import Chart from "../components/chart";
import TopicButtons from "../components/topic-buttons";
import Messages from "../components/messages";
import ClusterHistory from "./cluster-history";
import DrawerSide from "../components/drawer-side";
import { NavbarContext } from "../NavbarContext";

const DashboardContainer = (props) => {
  // getting sharable state from the useContex
  const { setRenderDrawerButton } =
    useContext(NavbarContext).drawerButtonsState;
  const { sideBarMode } = useContext(NavbarContext).sideBarState;
  const [chartData, setChart] = useState({
    topics: { labels: [], datasets: [] },
    reqRes: { labels: [], datasets: [] },
  });

  const [total, setTotal] = useState({
    totalRetainedBytes: 0,
    totalReq: 0,
    totalRes: 0,
  });

  const [metricSelection, setMetricSelection] = useState({
    retainedBytes: true,
    reqResBytes: false,
  });

  const { metricIndex } = useContext(NavbarContext).metricIndexState;
  const data = useContext(NavbarContext).userState.user.metric.at(metricIndex);

  useEffect(() => {
    //if no clusters in user info, no charts will load
    try {
      const retainedBytes = data.retained_bytes.metrics.map(
        (topic) => topic.value
      );
      const topics = data.retained_bytes.metrics.map((topic) => topic.topic);
      const valuesReq = data.request_bytes.metrics.map((topic) => topic.value);
      const valuesRes = data.response_bytes.metrics.map((topic) => topic.value);

    setTotal({
      totalRetainedBytes: data.retained_bytes.totalValue,
      totalReq: data.request_bytes.totalValue,
      totalRes: data.response_bytes.totalValue,
    });

    setChart({
      topics: {
        labels: topics,
        datasets: [
          {
            label: "bytes",
            data: retainedBytes,
            backgroundColor: "rgba(64, 180, 179, 0.5)",
            borderWidth: 1,
          },
        ],
      },
      reqRes: {
        labels: data.request_bytes.metrics.map((topic) => topic.type),
        datasets: [
          {
            label: "request bytes",
            data: valuesReq,
            backgroundColor: "rgba(64, 180, 179, 0.5)",
            borderWidth: 1,
          },
          {
            label: "response bytes",
            data: valuesRes,
            backgroundColor: "rgba(250, 73, 112, 0.5)",
            borderWidth: 1,
          },
        ],
      },
    });
  }, []);

  useEffect(() => {
    setRenderDrawerButton(true);
  }, []);

  // dictates the view mode on dashbaord
  const { dashboardMode, setDashboardMode } =
    useContext(NavbarContext).dashboardState;

  // mode switching functions
  function changeModeViewCluster() {
    setDashboardMode("viewCluster");
  }
  function changeModeRealtimeMonitoring() {
    setDashboardMode("realTimeMonitoring");
  }
  function changeModeClusterComparison() {
    setDashboardMode("clusterComparison");
  }

  // sets current dashboard view
  let dashboardView = <></>;
  if (dashboardMode === "viewCluster") {
    dashboardView = (
      <main className="cluster-container">
        {metricSelection.retainedBytes && (
          <>
            <Chart
              chartData={chartData}
              topicChart={true}
              reqResChart={false}
              totalBytes={total.totalRetainedBytes}
            />
          </>
        )}
        {metricSelection.reqResBytes && (
          <Chart
            chartData={chartData}
            topicChart={false}
            reqResChart={true}
            totalRes={total.totalRes}
            totalReq={total.totalReq}
          />
        )}
      </main>
    );
  } else if (mode === "realTimeMonitoring") {
    dashboardView = (
      <>
        <Messages />
      </>
    );
  } else {
    dashboardView = <></>;
  }

  // update metrics object with desired viewing metrics
  function updateSideDrawer(next) {
    const metrics = metricSelection;
    for (let key in metrics) {
      if (metrics[key] === true) metrics[key] = false;

      if (key === next) metrics[key] = true;
    }
    setMetricSelection(metrics);
  }

  return (
    <>
      <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content border-solid border-2 border-black-500">
          <div className="mt-4 flex justify-around">
            <div class="btn-group">
              <button
                className={mode === "viewCluster" ? "btn btn-accent" : "btn"}
                onClick={changeModeViewCluster}
              >
                View Cluster
              </button>
              <button
                className={
                  mode === "realTimeMonitoring" ? "btn btn-accent" : "btn"
                }
                onClick={changeModeRealtimeMonitoring}
              >
                Realtime Monitoring
              </button>
              <button
                className={
                  mode === "clusterComparison" ? "btn btn-accent" : "btn"
                }
                onClick={changeModeClusterComparison}
              >
                Cluster Comparison
              </button>
            </div>
          </div>
          <div className="flex justify-around pt-10">{dashboardView}</div>
          {/* <!-- Page content here --> */}
        </div>
        <AddClusterForm />
        <DrawerSide
          metricSelection={metricSelection}
          updateSideDrawer={updateSideDrawer}
        />
      </div>
    </>
  );
};

export default DashboardContainer;
