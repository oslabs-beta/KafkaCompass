// src/components/PieChart.js
import React from "react";
import { Bar } from "react-chartjs-2";

function PieChart({ chartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Topics in your cluster</h2>
      <Bar
        width={"20%"}
        type={'bar'}
        data={chartData}
        options={{
            maintainAspectRatio: false
        }}
      />
    </div>
  );
}
export default PieChart;