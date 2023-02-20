import React, { useContext } from "react";
import { NavbarContext } from "../NavbarContext";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";

const Chart = (props) => {
  // selecting metric specific to this chart
  const metric = props.metricSelection;
  const chartData = props.chartData[metric];

  const data = chartData.info;

  const { setMetric } = useContext(NavbarContext).metricState;
  const { sideBarMode } = useContext(NavbarContext).sideBarState;

  async function updateMetrics() {
    const response = await fetch("/api/metric");
    const metric = await response.json();

    setMetric(metric);
  }

  return (
    <div className="topic-chart font-mono chart-container">
      <p style={{ fontSize: "18px" }}>{chartData.colDescription}</p>

      <br />
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

export default Chart;
