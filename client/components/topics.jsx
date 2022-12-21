import React, { useState, useEffect }  from 'react';
import 'chart.js/auto';
import { Bar } from "react-chartjs-2";

const Topics = ({chartData, totalBytes}) => {
    return (
        <div className="topic-chart font-mono chart-container">
          <button className = 'mb-5 btn btn-accent'>Choose Cluster</button>
          <p style={{fontSize: "18px"}}>Topics in your cluster</p>
          <br />
          <Bar
            width={"20%"}
            type={'bar'}
            data={chartData}
            options={{
                maintainAspectRatio: false
            }}
          />
          <br />
          <p>Total number of bytes retained by server: <span>{totalBytes}</span></p>
        </div>
       
    )
}

export default Topics;