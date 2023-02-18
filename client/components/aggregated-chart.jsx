import React, { useContext } from "react";
import { NavbarContext } from "../NavbarContext";
import "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";

const AggregatedChart = (props) => {
  //metric selection and context state
  const { setMetric } = useContext(NavbarContext).metricState;
  const { sideBarMode } = useContext(NavbarContext).sideBarState;

  async function updateMetrics() {
    const response = await fetch("/api/metric");
    const metric = await response.json();

    setMetric(metric);
  }

  // selecting metric specific to this chart
  const metric = props.metricSelection;
  const chartData = props.chartData[metric];

  const data = chartData.info;

  const { user } = useContext(NavbarContext).userState;
  //object with all statistics for user clusters
  const rawMetric = user.metric;

  //stats for aggregated charts
  const aggStats = {
    active_connection_count: { label: "Active Connection Count", data: {} },
    partition_count: { label: "Partition Count", data: {} },
    successful_authentication_count: {
      label: "Successful Authentication Count",
      data: {}
    },
    cluster_load_percent: { label: "Cluster Load Percent", data: {} }
  };

  //dataset creation for charts
  for (const stat in aggStats) {
    const data = { labels: [], datasets: [] };
    let statArr = [];
    const labels = [];
    let curr = rawMetric[0].clusterId;
    for (let i = 0; i < rawMetric.length; i++) {
      data.labels.push(rawMetric[i].created_at);
      statArr.push({
        x: i,
        //edge case where some of the arrays were empty
        y: rawMetric[i][stat].metrics.length
          ? rawMetric[i][stat].metrics[0].value
          : 0
      });
      if (i + 1 === rawMetric.length || rawMetric[i + 1].clusterId !== curr) {
        const metricObj = { label: curr, data: statArr };
        data.labels.sort();
        data.datasets.push(metricObj);
        if (i + 1 !== rawMetric.length) {
          statArr = [];
          curr = rawMetric[i + 1].clusterId;
        }
      }
    }
    aggStats[stat].data = data;
  }

  //creating aggregated charts
  const charts = [];
  for (const stat in aggStats) {
    const chart = (
      <div className="topic-chart font-mono chart-container pb-24">
        <p style={{ fontSize: "18px" }}>{aggStats[stat].label}</p>

        <br />
        <Line
          type={"line"}
          options={{
            maintainAspectRatio: false
          }}
          data={aggStats[stat].data}
        />
      </div>
    );
    charts.push(chart);
  }

  return <div className="grid grid-cols-2 pb-8">{charts}</div>;
};

export default AggregatedChart;
