import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AddClusterForm from "../components/add-cluster-form";
import ClusterItem from "../components/cluster-item";
import AggregatedChart from "../components/aggregated-chart";
import { NavbarContext } from "../NavbarContext";
import date from "../helper/dateFormatter";

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
  const [snapshot1State, setSnapshot1State] = useState();
  const [snapshot2State, setSnapshot2State] = useState();

  function selectSnapshot1(e) {
    setSnapshot1State(e.target.id);
  }
  function selectSnapshot2(e) {
    setSnapshot2State(e.target.id);
  }
  function submitSnapshots(e) {
    if (snapshot1State !== undefined && snapshot2State !== undefined) {
      setMode("display");
    } else console.log("Please select two snapshots to compare");
  }
  function backToSelectionMode() {
    setSnapshot1State();
    setSnapshot2State();
    setMode("select");
  }

  let render = <></>;

  if (mode === "select") {
    const snapshotList1 = [];
    const snapshotList2 = [];
    const selectItems = [];
    if (metrics.length) {
      for (const metricIndex in metrics) {
        snapshotList1.push(
          <li
            key={metricIndex}
            className={
              snapshot1State === metricIndex ? "bg-blue-800 text-white" : ""
            }
          >
            <a
              className="justify-start"
              onClick={selectSnapshot1}
              id={metricIndex}
            >
              {metrics[metricIndex].clusterId} :{" "}
              {metrics[metricIndex].created_at !== undefined
                ? date.format(new Date(metrics[metricIndex].created_at))
                : "N/A"}
            </a>
          </li>
        );
        snapshotList2.push(
          <li
            key={metricIndex}
            className={
              snapshot2State === metricIndex ? "bg-blue-800 text-white" : ""
            }
          >
            <a
              className="justify-start"
              onClick={selectSnapshot2}
              id={metricIndex}
            >
              {metrics[metricIndex].clusterId} :{" "}
              {metrics[metricIndex].created_at !== undefined
                ? date.format(new Date(metrics[metricIndex].created_at))
                : "N/A"}
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
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-[18rem] max-h-96 overflow-y-auto flex-nowrap"
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
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-[18rem] h-96 max-h-96 overflow-y-auto flex-nowrap"
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
        </div>
      );
    }
  } else if (mode === "display") {
    const snapshot1Obj = metrics[snapshot1State];
    const snapshot2Obj = metrics[snapshot2State];
    let tableRows = [];
    for (const metric in snapshot1Obj) {
      if (
        metric === "created_at" ||
        metric === "_id" ||
        metric === "clusterId" ||
        metric === "__v"
      )
        continue;
      let oneRow = <></>;
      oneRow = (
        <tr key={metric}>
          <td>{snapshot1Obj[metric].totalValue}</td>
          <td className="text-center bg-slate-200">{metric}</td>
          <td className="text-end">{snapshot2Obj[metric].totalValue}</td>
        </tr>
      );
      tableRows.push(oneRow);
    }

    render = (
      <div>
        <div className="flex justify-around pb-5">
          <button
            className="btn btn-active  bg-blue-800 w-min self-center"
            onClick={backToSelectionMode}
          >
            Select New Snapshots
          </button>
        </div>
        <div className="flex justify-around pb-5">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    Cluster: {snapshot1Obj.clusterId} at{" "}
                    {snapshot1Obj.created_at !== undefined
                      ? date.format(new Date(snapshot1Obj.created_at))
                      : "N/A"}
                  </th>
                  <th className="text-center">Metric</th>
                  <th>
                    Cluster: {snapshot2Obj.clusterId} at{" "}
                    {snapshot2Obj.created_at !== undefined
                      ? date.format(new Date(snapshot2Obj.created_at))
                      : "N/A"}
                  </th>
                </tr>
              </thead>
              <tbody>{tableRows}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
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

  return (
    <>
      <div>
        <h1 className="text-center text-2xl font-bold pb-5 pt-5">
          Snapshot Comparison
        </h1>
        {render}
      </div>
    </>
  );
};

export default SnapshotComparison;
