import React, { useEffect, useReducer, useState } from "react";
import AddClusterForm from "../components/add-cluster-form";
import Chart from "../components/chart";
import TopicButtons from "../components/topic-buttons";

const DashboardContainer = (props) => {
 // topic and req-res chart data for the chats
  const [topicChart, setTopics] = useState({ labels: [], datasets: [] });
  const [reqResChart, setReqRes] = useState({ labels: [], datasets: [] });
  const [totalBytes, setTotal] = useState();
  const [totalRes, setTotalRes] = useState();
  const [totalReq, setTotalReq] = useState();
  const [metricSelection, setMetricSelection] = useState({
    retainedBytes: true,
    reqResBytes: false,
  });

  const data = props.metrics;

  useEffect(() => {
    const retainedValues = data.retained_bytes.metrics.map(
      (topic) => topic.value
    );
    setTotal(data.retained_bytes.totalValue);
    setTopics({
      labels: data.retained_bytes.metrics.map((topic) => topic.topic),
      datasets: [
        {
          label: "bytes",
          data: retainedValues,
          backgroundColor: "rgba(64, 180, 179, 0.5)",
          borderWidth: 1,
        },
      ],
    });

    const valuesReq = data.request_bytes.metrics.map((topic) => topic.value);
    const valuesRes = data.response_bytes.metrics.map((topic) => topic.value);
    setTotalReq(data.request_bytes.totalValue);
    setTotalRes(data.response_bytes.totalValue);
    setReqRes({
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
    });
  }, []);

  // real useEffect
  // useEffect( () => {
  //     const getData = async() => {
  //         const response = await fetch('/api/metric');
  //         console.log(response);
  //         const data = await response.json();
  //         if (response.ok) {
  //             console.log(data);
  //             const retainedValues = data.retained_bytes.metrics.map((topic) => topic.value);
  //             setTotal(data.retained_bytes.totalValue);
  //             setTopics({labels: data.retained_bytes.metrics.map((topic) => topic.topic),
  //                 datasets: [
  //                     {
  //                     label: 'bytes',
  //                     data: retainedValues,
  //                     backgroundColor: 'rgba(64, 180, 179, 0.5)',
  //                     borderWidth: 1
  //                     }
  //             ]});

  //             const valuesReq =  data.request_bytes.metrics.map((topic) => topic.value);
  //             const valuesRes = data.response_bytes.metrics.map((topic) => topic.value);
  //             setTotalReq(data.request_bytes.totalValue);
  //             setTotalRes(data.response_bytes.totalValue);
  //             setReqRes({labels: data.request_bytes.metrics.map((topic) => topic.type),
  //                 datasets: [
  //                     {
  //                     label: 'request bytes',
  //                     data: valuesReq,
  //                     backgroundColor: 'rgba(64, 180, 179, 0.5)',
  //                     borderWidth: 1
  //                     },
  //                     {
  //                     label: 'response bytes',
  //                     data: valuesRes,
  //                     backgroundColor: 'rgba(250, 73, 112, 0.5)',
  //                     borderWidth: 1
  //                     }
  //             ]});
  //         }
  //     }
  //     try {
  //         getData();
  //     } catch(err) {
  //         console.log('Network error');
  //     }
  // }, []);

  useEffect(() => {
    props.setDrawerButton(true);
  });

  // dictates the view mode on dashbaord
  const [mode, setMode] = useState("viewCluster");

  // mode switching functions
  function changeModeViewCluster() {
    setMode("viewCluster");
  }
  function changeModeRealtimeMonitoring() {
    setMode("realtimeMonitoring");
  }
  function changeModeClusterComparison() {
    setMode("clusterComparison");
  }

  // sets current dashboard view
  let dashboardView = <></>;
  if (mode === "viewCluster") {
    dashboardView = (
      <main className="cluster-container">
        {metricSelection.retainedBytes && (
          <>
            <Chart
              chartData={topicChart}
              retained={true}
              totalBytes={totalBytes}
              setMetrics={props.setMetrics}
            />
            <TopicButtons
              chartData={topicChart}
              setTopics={setTopics}
              totalBytes={totalBytes}
            />
          </>
        )}
        {metricSelection.reqResBytes && (
          <Chart
            chartData={reqResChart}
            reqRes={true}
            totalRes={totalRes}
            totalReq={totalReq}
          />
        )}
      </main>
    );
  } else if (mode === "realTimeMonitoring") {
    dashboardView = <></>;
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
                  mode === "realtimeMonitoring" ? "btn btn-accent" : "btn"
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
        <div class="drawer-side">
          <label for="my-drawer" class="drawer-overlay"></label>
          <ul class="menu p-4 w-80 bg-base-100 text-base-content">
            <li
              onClick={() => updateSideDrawer("retainedBytes")}
              class={metricSelection.retainedBytes ? "bg-secondary" : ""}
            >
              <a>Retained bytes</a>
            </li>
            <li
              onClick={() => updateSideDrawer("reqResBytes")}
              class={metricSelection.reqResBytes ? "bg-secondary" : ""}
            >
              <a>Request/Response bytes</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardContainer;
