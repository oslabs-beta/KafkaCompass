import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddClusterForm from "../components/add-cluster-form";
import ClusterItem from "../components/cluster-item";
import AggregatedChart from "../components/aggregated-chart";
import { NavbarContext } from "../NavbarContext";

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

  //temp
  const [metricSelection, setMetricSelection] = useState("retained_bytes");

  return (
    <>
      <div>
        <h1 className="text-center text-2xl font-bold pb-10">
          Cluster History
        </h1>
        <AggregatedChart
          chartData={chartData}
          metricSelection={metricSelection}
        />
        <h1 className="text-center text-xl font-bold">Snapshots</h1>
        <div className="table-history">
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="history-table table-compact w-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th></th>
                  <th>Date</th>
                  <th>Cluster Id:</th>
                  <th>View Metrics</th>
                </tr>
              </thead>
              <tbody>{clusterItems}</tbody>
            </table>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <AddClusterForm />
    </>
  );
};

export default ClusterHistory;
