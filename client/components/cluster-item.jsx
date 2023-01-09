import React, { useContext } from "react";
import { NavbarContext } from "../NavbarContext";

const ClusterItem = (props) => {
  const { index, date, clusterId } = props;
  const { setMetricIndex } = useContext(NavbarContext).metricIndexState;
  const { setDashboardMode } = useContext(NavbarContext).dashboardState;

  function handleClick() {
    setMetricIndex(index);
    setDashboardMode("performanceStatistics");
  }

  return (
    <div className="flex justify-around">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{index}</h2>
          <p>Date: {date}</p>
          <p>Cluster ID: {clusterId}</p>
          <div className="card-actions justify-end">
            <button onClick={handleClick} className="btn btn-primary">
              View Metrics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClusterItem;
