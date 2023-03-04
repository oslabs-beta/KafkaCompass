import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddClusterForm from "../components/add-cluster-form";
import ClusterItem from "../components/cluster-item";
import AggregatedChart from "../components/aggregated-chart";
import { NavbarContext } from "../NavbarContext";

const SnapshotComparison = ({ chartData }) => {
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

  // //temp
  // const [metricSelection, setMetricSelection] = useState("retained_bytes");

  return (
    <>
      <div>
        <h1 className="text-center text-2xl font-bold pb-10">
          Snapshot Comparison
        </h1>
      </div>
    </>
  );
};

export default SnapshotComparison;
