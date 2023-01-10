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
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td>{index}</td>
      <td>{date}</td>
      <td>{clusterId}</td>
      <td>
      <a onClick={handleClick} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Cluster Metrics</a>
      </td>
    </tr>
  );
};

export default ClusterItem;
