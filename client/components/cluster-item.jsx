import React, { useContext } from "react";
import { NavbarContext } from "../NavbarContext";

const ClusterItem = (props) => {
  const { index, date, clusterId } = props;
  const { setMetricIndex } = useContext(NavbarContext).metricIndexState;
  const { setDashboardMode } = useContext(NavbarContext).dashboardState;

  // changing metric index to get cluster's history snapshot from the cluster history list
  function handleClick() {
    setMetricIndex(index);
    setDashboardMode("performanceStatistics");
  }

  return (
    <tr className="bg-white border-b  hover:bg-gray-50 py-3 px-6 text-center">
      <td>{index}</td>
      <td className="text-left w-[17rem]">{date}</td>
      <td>{clusterId}</td>
      <td>
        <a
          onClick={handleClick}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          Cluster Metrics
        </a>
      </td>
    </tr>
  );
};

export default ClusterItem;
