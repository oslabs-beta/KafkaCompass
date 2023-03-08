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
import SnapshotComparison from "../components/snapshot-comparison";

const DashboardContainer = (props) => {
  // state of current topic inside the Content Monitoring view
  const [topic, setTopic] = useState("Select a topic");
  const [clusterAdded, setClusterAdded] = useState(false);

  // cluster selection for the Content Monitoring
  const [cluster, setCluster] = useState(0);
  console.log("cluster in Dashboard: ", cluster);
  // current cluster information
  const [clusterId, setClusterId] = useState("");
  const [snapshotTime, setSnapshotTime] = useState("");

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
        "cluster_load_percent",
        "consumer_lag_offsets",
        "received_bytes",
        "received_records",
        "request_bytes",
        "request_count",
        "retained_bytes",
        "sent_bytes",
        "sent_records"
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
      setClusterId(data.clusterId);
      setSnapshotTime(data.created_at);
    } catch {
      console.log("No clusters in user data");
    }
  }, [metricIndex, cluster]);

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
          clusterId={clusterId}
          snapshotTime={snapshotTime}
        />
      </>
    );
  } else if (dashboardMode === "contentMonitoring") {
    dashboardView = (
      <>
        <h1 className="text-center text-2xl font-bold pt-5">
          Content Monitoring
        </h1>
        <div className="flex justify-center pt-10 items-start">
          <Messages setTopic={setTopic} topic={topic} cluster={cluster} />
        </div>
      </>
    );
  } else if (dashboardMode === "clusterHistory") {
    dashboardView = <ClusterHistory chartData={chartData} />;
  } else if (dashboardMode === "snapshotComparison") {
    dashboardView = <SnapshotComparison chartData={chartData} />;
  }

  // update metrics object with desired viewing metrics
  function updateSideDrawer(next) {
    setMetricSelection(next);
  }

  return (
    <>
      <div className="justify-center">{dashboardView}</div>
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
