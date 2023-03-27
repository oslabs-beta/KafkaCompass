import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddClusterForm from "../components/add-cluster-form";
import ClusterItem from "../components/cluster-item";
import AggregatedChart from "../components/aggregated-chart";
import { NavbarContext } from "../NavbarContext";
import date from "../helper/dateFormatter";

const ClusterHistory = ({ chartData }) => {
  const navigate = useNavigate();
  const metrics = useContext(NavbarContext).userState.user.metric;
  const { setRenderDrawerButton } =
    useContext(NavbarContext).drawerButtonsState;

  useEffect(() => {
    setRenderDrawerButton(true);
  });

  // gets cluster items from metrics
  const clusterItems = metrics.map((metric, idx) => {
    // console.log("time at:", metric.created_at);
    let metricDate = "N/A";
    if (metric.created_at !== undefined) {
      metricDate = date.format(new Date(metric.created_at));
      console.log(metricDate);
    }
    return (
      <ClusterItem
        index={idx}
        key={metric._id}
        date={metricDate}
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
        <h1 className="text-center text-2xl font-bold pb-10 pt-5">
          Cluster History
        </h1>
        <AggregatedChart chartData={chartData} />
        <h1 className="text-center text-xl font-bold pb-5">Snapshots</h1>
        <div className="table-history pb-5">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="history-table table-compact w-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th></th>
                  <th className="py-3 px-6 text-center">Date</th>
                  <th className="py-3 px-6 text-center">Cluster Id:</th>
                  <th className="py-3 px-6 text-center">View Metrics</th>
                </tr>
              </thead>
              <tbody>{clusterItems}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClusterHistory;
