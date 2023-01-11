import React, { useEffect, useState, useContext } from "react";
import AddClusterForm from "../components/add-cluster-form";
import Chart from "../components/chart";
import Messages from "../components/messages";
import { NavbarContext } from "../NavbarContext";
import TableData from "../components/table-data";
import DrawerSide from "../components/drawer-side";
import mapChartData from "../helper/mapChartData";
import ClusterHistory from "./cluster-history";
import SwitchCluster from "../components/switch-cluster-form";

const DashboardContainer = (props) => {
  //state of current topic for Real-Time Monitoring mode
  const [topic, setTopic] = useState("Select a topic");
  const [cluster, setCluster] = useState(0);
  useEffect(() => {
    console.log("CLUSTER INDEX STATE CHANGE");
    console.log("CURRENT CLUSTER STATE: ", cluster);
  }, [cluster]);

  document.body.style.backgroundImage = "none";

  // getting sharable state from the useContex
  const { setRenderDrawerButton } =
    useContext(NavbarContext).drawerButtonsState;
  const { sideBarMode } = useContext(NavbarContext).sideBarState;

  const [chartData, setChart] = useState();

  const [metricSelection, setMetricSelection] = useState("retained_bytes");

  const [tableData, setTableData] = useState([]);

  const { metricIndex } = useContext(NavbarContext).metricIndexState;

  const { user } = useContext(NavbarContext).userState;

  useEffect(() => {
    const data = user.metric.at(metricIndex);

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
      setChart(mapChartData(data));
    } catch {
      console.log("No clusters in user data");
    }
  }, [metricIndex]);

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
        <Messages setTopic={setTopic} topic={topic} cluster={cluster} />
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
                      ? "btn bg-blue-800"
                      : "btn"
                  }
                  onClick={changeModePerformanceStatistics}
                >
                  Performance Statistics
                </button>
                <button
                  className={
                    dashboardMode === "contentMonitoring"
                      ? "btn bg-blue-800"
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
      <SwitchCluster cluster={cluster} setCluster={setCluster} />
    </>
  );
};

export default DashboardContainer;
