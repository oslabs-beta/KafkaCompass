// src/components/PieChart.js
import React from "react";
import { Bar } from "react-chartjs-2";

function PieChart({ chartData }) {
  return (
    <div className="font-mono chart-container">
      <p style={{ textAlign: "center", fontSize: "18px"}}>Topics in your cluster</p>
      <br />
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