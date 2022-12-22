import React, { useState, useEffect }  from 'react';
import 'chart.js/auto';
import { Bar } from "react-chartjs-2";

const Chart = props => {
    return (
        <div className="topic-chart font-mono chart-container">
          <button className = 'mb-5 btn btn-accent'>Choose Cluster</button>
          {props.retained && <p style={{fontSize: "18px"}}>Topics in your cluster</p>}
          {props.reqRes &&  <p style={{fontSize: "18px"}}>Server request and response bytes</p>}
          <br />
          <Bar
            width={"20%"}
            type={'bar'}
            data={props.chartData}
            options={{
                maintainAspectRatio: false
            }}
          />
          <br />
          {props.retained && <p className='chart-total'>Total number of bytes retained by server: <span>{props.totalBytes}</span></p>}
          {props.reqRes && 
          <>
            <p className='chart-total'>Total number of request bytes: <span>{props.totalReq}</span></p>
            <p className='chart-total'>Total number of response bytes: <span>{props.totalRes}</span></p>
          </>
          }
        </div>
       
    )
}

export default Chart;