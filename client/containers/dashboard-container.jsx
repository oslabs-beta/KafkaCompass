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
import PerformanceStatistics from "../components/performance-statistics";

const DashboardContainer = (props) => {
  // state of current topic inside the Content Monitoring view
  const [topic, setTopic] = useState("Select a topic");
  const [clusterAdded, setClusterAdded] = useState(false);

  // cluster selection for the Content Monitoring
  const [cluster, setCluster] = useState(0);

  // Setting document's background image back to none -> default
  document.body.style.backgroundImage = "none";

  // getting sharable state from the useContex
  const { setRenderDrawerButton } =
    useContext(NavbarContext).drawerButtonsState;
  const { sideBarMode } = useContext(NavbarContext).sideBarState;
  const [metricSelection, setMetricSelection] = useState("retained_bytes");

  // cluster data for charts and tables for the user
  const [chartData, setChart] = useState();
  const [tableData, setTableData] = useState([]);
  const { metricIndex } = useContext(NavbarContext).metricIndexState;
  const { user } = useContext(NavbarContext).userState;

  useEffect(() => {
    //if no clusters in user info, no charts will load
    try {
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

  // functions for switching mode of the dashboard
  function changeModePerformanceStatistics() {
    setDashboardMode("performanceStatistics");
  }
  function changeModeContentMonitoring() {
    setDashboardMode("contentMonitoring");
  }

  const { setMetric } = useContext(NavbarContext).metricState;
  async function updateMetrics() {
    console.log("doing the thing");
    const response = await fetch("/api/metric");
    const metric = await response.json();

    setMetric(metric);
  }

  // sets current dashboard view
  let dashboardView = <></>;
  if (dashboardMode === "performanceStatistics") {
    dashboardView = (
      <>
        <PerformanceStatistics
          chartData={chartData}
          metricSelection={metricSelection}
          tableData={tableData}
          updateSideDrawer={updateSideDrawer}
        />
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
      <div className="justify-center h-screen">{dashboardView}</div>
      <AddClusterForm
        clusterAdded={clusterAdded}
        setClusterAdded={setClusterAdded}
      />
      {/* <DrawerSide
        metricSelection={metricSelection}
        updateSideDrawer={updateSideDrawer}
      /> */}

      <SwitchCluster
        cluster={cluster}
        setCluster={setCluster}
        clusterAdded={clusterAdded}
      />
    </>
  );
};

export default DashboardContainer;
