import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AddClusterForm from "../components/add-cluster-form";
import ClusterItem from "../components/cluster-item";
import AggregatedChart from "../components/aggregated-chart";
import { NavbarContext } from "../NavbarContext";

const SnapshotComparison = ({ chartData }) => {
  //state toggling if displaying selection menu or comparison
  const [mode, setMode] = useState("select");
  const navigate = useNavigate();
  const metrics = useContext(NavbarContext).userState.user.metric;
  const { setRenderDrawerButton } =
    useContext(NavbarContext).drawerButtonsState;
  useEffect(() => {
    setRenderDrawerButton(true);
  });
  let snapshot1 = useRef();
  let snapshot2 = useRef();

  function selectSnapshot1(e) {
    console.log("snapshotSelected");
    snapshot1.current = e.target.id;
    console.log("snapshot1: ", snapshot1);
  }
  function selectSnapshot2(e) {
    console.log("snapshotSelected");
    snapshot2.current = e.target.id;
    console.log("snapshot2: ", snapshot2);
  }
  function submitSnapshots(e) {
    console.log("snapshots Submitted");
    console.log("Snapshot 1: ", snapshot1, "Snapshot 2: ", snapshot2);
    if (snapshot1.current !== undefined && snapshot2.current !== undefined) {
      setMode("display");
    } else console.log("Please select two snapshots to compare");
  }

  console.log("metrics: ", metrics);

  let render = <></>;

  if (mode === "select") {
    const snapshotList1 = [];
    const snapshotList2 = [];
    const selectItems = [];
    if (metrics.length) {
      for (const metric of metrics) {
        console.log("metric: ", metric);
        snapshotList1.push(
          <li key={metric.created_at}>
            <a
              className="justify-end"
              onClick={selectSnapshot1}
              id={metric.created_at}
            >
              {metric.clusterId} : {metric.created_at}
            </a>
          </li>
        );
        snapshotList2.push(
          <li key={metric.created_at}>
            <a
              className="justify-end"
              onClick={selectSnapshot2}
              id={metric.created_at}
            >
              {metric.clusterId} : {metric.created_at}
            </a>
          </li>
        );
        // selectItems.push(
        //   <option>
        //     {metric.clusterId} : {metric.created_at}
        //   </option>
        // );
      }
      render = (
        <div className="flex justify-around">
          <div className="flex justify-around">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn m-1">
                Snapshot 1
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-min"
              >
                {snapshotList1}
              </ul>
            </div>
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn m-1">
                Snapshot 2
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-min"
              >
                {snapshotList2}
              </ul>
            </div>
            <button
              className="btn btn-active  bg-blue-800 w-min self-center"
              onClick={submitSnapshots}
            >
              Compare Snapshots
            </button>
          </div>
          {/* <select>{selectItems}</select> */}
        </div>
      );
    }
  } else if (mode === "display") {
    render = <h1>Check out these stats</h1>;
  }

  // gets cluster items from metrics
  const clusterItems = metrics.map((metric, idx) => {
    return (
      <ClusterItem
        index={idx}
        key={metric._id}
        date={metric.created_at}
        clusterId={metric.clusterId}
        navigate={navigate}
      />
    );
  });

  // //temp
  // const [metricSelection, setMetricSelection] = useState("retained_bytes");

  return (
    <>
      <div>
        <h1 className="text-center text-2xl font-bold pb-10">
          Snapshot Comparison
        </h1>
        {render}
      </div>
    </>
  );
};

export default SnapshotComparison;
