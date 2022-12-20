import React, { useState, useEffect }  from 'react';
import 'chart.js/auto';
import { Bar } from "react-chartjs-2";

const mockData = [
    {
      value: 0.0,
      labels: { kafka_id: "lkc-j33yz8", topic: "new_poems" },
    },
    {
      value: 285.0,
      labels: { kafka_id: "lkc-j33yz8", topic: "poems" },
    },
    {
      value: 288.0,
      labels: { kafka_id: "lkc-j33yz8", topic: "poems_1" },
    },
    {
      value: 288.0,
      labels: { kafka_id: "lkc-j33yz8", topic: "poems_4" },
    },
    {
      value: 94.0,
      labels: { kafka_id: "lkc-j33yz8", topic: "songs" },
    },
    {
      value: 0.0,
      labels: { kafka_id: "lkc-j33yz8", topic: "texts" },
    }
  ]

const Topics = (props) => {
    const [chartData, setChartData] = useState({labels: [], datasets: []});
    const [totalBytes, setTotal] = useState();

    // Mock functionality to render mock data
    // Comment out when server makes api calls
    useEffect(() => {
      const values =  mockData.map((topic) => topic.value);
      setTotal(values.reduce((a, b) => a + b));
      setChartData({labels: mockData.map((topic) => topic.labels.topic), 
        datasets: [
          {
            label: 'bytes',
            data: values,
            backgroundColor: 'rgba(64, 180, 179, 0.5)',
            borderWidth: 1
          }
        ]});
    }, []);

    // Uncomment when we have server responding with api info
    // useEffect(() => {
    //   const getData = async() => {
    //     const response = await fetch('/api/topic');
    //     if (response.ok) {
    //       const data = await response.json();
    //       const values =  mockData.map((topic) => topic.value);
    //       setTotal(values.reduce((a, b) => a + b));
    //       setChartData({labels: data.map((topic) => topic.labels.topic), 
    //         datasets: [
    //           {
    //             label: 'bytes',
    //             data: values,
    //             backgroundColor: 'rgba(64, 180, 179, 0.5)',
    //             borderWidth: 1
    //           }
    //       ]});
    //     }
    //   }
    //   getData();
    // }, [])

    console.log(chartData.datasets[0]);
    return (
        <div className="topic-chart font-mono chart-container">
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
          <br />
          <p>Total number of bytes retained by server: <span>{totalBytes}</span></p>
        </div>
    )
}

export default Topics;