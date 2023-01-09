import React, { useEffect, useState, useContext } from "react";
import AddClusterForm from "../components/add-cluster-form";
import Chart from "../components/chart";
import Messages from "../components/messages";
import { NavbarContext } from "../NavbarContext";
import TableData from "../components/table-data";
import DrawerSide from "../components/drawer-side";
import mapChartData from "../helper/mapChartData";
import ClusterHistory from "./cluster-history";

const DashboardContainer = (props) => {
  //state of current topic for Real-Time Monitoring mode
  const [topic, setTopic] = useState("Select a topic");

  // getting sharable state from the useContex
  const { setRenderDrawerButton } =
    useContext(NavbarContext).drawerButtonsState;
  const { sideBarMode } = useContext(NavbarContext).sideBarState;

  const [chartData, setChart] = useState();

  const [total, setTotal] = useState({
    totalRetainedBytes: 0,
    totalReq: 0,
    totalRes: 0
  });

  const [metricSelection, setMetricSelection] = useState("retained_bytes");

  const [tableData, setTableData] = useState([]);

  const { metricIndex } = useContext(NavbarContext).metricIndexState;
  console.log(metricIndex);

  const data = useContext(NavbarContext).userState.user.metric.at(metricIndex);

  useEffect(() => {
    const dataForTable = [
      "partition_count",
      "active_connection_count",
      "successful_authentication_count",
      "cluster_load_percent"
    ].map((td) => {
      const name = td.replace(/_/g, " ");
      const description = data[td].description;
      const value = data[td].totalValue;
      return {
        name,
        description,
        value
      };
    });

    setTableData(dataForTable);

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
        totalRes: data.response_bytes.totalValue
      });

      setChart(mapChartData(data));
    } catch {
      console.log("No clusters in user data");
    }
  }, []);

  useEffect(() => {
    setRenderDrawerButton(true);
  }, []);

  // dictates the view mode on dashbaord
  const { dashboardMode, setDashboardMode } =
    useContext(NavbarContext).dashboardState;

  // mode switching functions
  function changeModePerformanceStatistics() {
    setDashboardMode("performanceStatistics");
  }
  function changeModeContentMonitoring() {
    setDashboardMode("contentMonitoring");
  }
  // function changeModeClusterComparison() {
  //   setDashboardMode("clusterComparison");
  // }

  // sets current dashboard view
  let dashboardView = <></>;
  if (dashboardMode === "performanceStatistics") {
    dashboardView = (
      <>
        <main className="cluster-container">
          {chartData && (
            <>
              <Chart chartData={chartData} metricSelection={metricSelection} />
            </>
          )}
        </main>
        <TableData tableData={tableData} />
      </>
    );
  } else if (dashboardMode === "contentMonitoring") {
    dashboardView = (
      <div className="flex justify-center pt-10 items-start">
        <Messages setTopic={setTopic} topic={topic} />
      </div>
    );
  } else if (dashboardMode === "clusterHistory") {
    dashboardView = <ClusterHistory />;
  }

  // update metrics object with desired viewing metrics
  function updateSideDrawer(next) {
    setMetricSelection(next);
  }

  return (
    <>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content border-solid border-2 border-black-500">
          <div className="mt-4 flex justify-around">
            {sideBarMode != "history" && (
              <div className="btn-group">
                <button
                  className={
                    dashboardMode === "performanceStatistics"
                      ? "btn btn-accent"
                      : "btn"
                  }
                  onClick={changeModePerformanceStatistics}
                >
                  Performance Statistics
                </button>
                <button
                  className={
                    dashboardMode === "contentMonitoring"
                      ? "btn btn-accent"
                      : "btn"
                  }
                  onClick={changeModeContentMonitoring}
                >
                  Content Monitoring
                </button>
                {/* <button
                  className={
                    dashboardMode === "clusterComparison"
                      ? "btn btn-accent"
                      : "btn"
                  }
                  onClick={changeModeClusterComparison}
                >
                  Cluster Comparison
                </button> */}
              </div>
            )}
          </div>
          <div className="justify-center pt-10">{dashboardView}</div>
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
