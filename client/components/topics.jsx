import React, { useState }  from 'react';
import BarChart from "./helper";
import 'chart.js/auto';

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

    const [chartData, setChartData] = useState({
        labels: mockData.map((topic) => topic.labels.topic), 
        datasets: [
          {
            label: 'bytes',
            data: mockData.map((topic) => topic.value),
            backgroundColor: 'rgba(64, 180, 179, 0.5)',
            borderWidth: 1
          }
        ]
      });
    return (
        <BarChart className='topic-chart' chartData={chartData} />
    )
}

export default Topics;