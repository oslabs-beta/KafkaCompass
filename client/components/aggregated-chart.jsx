import React, { useContext } from "react";
import { NavbarContext } from "../NavbarContext";
import "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";

const AggregatedChart = (props) => {
  // selecting metric specific to this chart
  const metric = props.metricSelection;
  const chartData = props.chartData[metric];

  const data = chartData.info;

  const { user } = useContext(NavbarContext).userState;
  console.log("chartData: ", user.metric);
  const connCountArr = [];
  const labels = [];
  for (let i = 0; i < user.metric.length; i++) {
    labels.push(i);
    connCountArr.push({
      x: i,
      y: user.metric[i].active_connection_count.metrics[0].value
    });
  }
  console.log("connCountArr: ", connCountArr);
  console.log("data: ", data);
  const data2 = {
    labels: labels,
    datasets: [
      {
        data: connCountArr
      }
    ]
  };

  const { setMetric } = useContext(NavbarContext).metricState;
  const { sideBarMode } = useContext(NavbarContext).sideBarState;

  async function updateMetrics() {
    const response = await fetch("/api/metric");
    const metric = await response.json();

    setMetric(metric);
  }

  return (
    <div className="topic-chart font-mono chart-container pb-10">
      <p style={{ fontSize: "18px" }}>{chartData.colDescription}</p>

      <br />
      <Line
        type={"line"}
        options={{
          maintainAspectRatio: false
        }}
        data={data2}
      />
      <Bar
        width={"20%"}
        type={"bar"}
        data={data}
        options={{
          maintainAspectRatio: false
        }}
      />
      <br />
      {chartData.compositeChart && (
        <>
          <p className="chart-total">
            {chartData.totalDescription1} <span>{chartData.totalValue1}</span>
          </p>
          <p className="chart-total">
            {chartData.totalDescription2} <span>{chartData.totalValue2}</span>
          </p>
        </>
      )}

      {!chartData.compositeChart && (
        <p className="chart-total">
          {chartData.totalDescription}
          <span>{chartData.totalValue}</span>
        </p>
      )}
    </div>
  );
};

export default AggregatedChart;
