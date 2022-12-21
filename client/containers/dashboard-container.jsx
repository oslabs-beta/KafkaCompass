import React, { useEffect, useState } from "react";
import AddClusterForm from "../components/add-cluster-form";
import Topics from "../components/topics";
import TopicButtons from "../components/topic-buttons";


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


const DashboardContainer = (props) => {
    // state for Topic chart
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

    useEffect( () => {
        props.setDrawerButton(true);
    });

    // dictates the view mode on dashbaord
    const [mode, setMode] = useState('viewCluster');
    // keeps track of user-selected metrics
    const [metricSelection, setMetricSelection] = useState({
        reqResBytes: false,
        retainedBytes: false
    });
    
    // mode switching functions
    function changeModeViewCluster () {
        setMode('viewCluster');
    };
    function changeModeRealtimeMonitoring () {
        setMode('realtimeMonitoring');
    };
    function changeModeClusterComparison () {
        setMode('clusterComparison');
    };

    // sets current dashboard view
    let dashboardView = <></>;
    if (mode === 'viewCluster') {
        dashboardView = (
            <main className="cluster-container">
                    <Topics chartData={chartData} 
                            setChartData={setChartData}
                            totalBytes={totalBytes}
                            setTotal={setTotal} />
                    <TopicButtons 
                            chartData={chartData} 
                            setChartData={setChartData} 
                            totalBytes={totalBytes}
                            setTotal={setTotal} />
            </main>
        )
    }
    else if (mode === 'realTimeMonitoring') {
        dashboardView = (
            <></>
        )
    }
    else {
        dashboardView = (
            <></>
        )
    }

    // update metrics object with desired viewing metrics
    function changeReqResBytes () {
        const setting = metricSelection.reqResBytes ? false : true;
        setMetricSelection((prev) => ({...prev, reqResBytes: setting}));
    }
    function changeRetainedBytes () {
        const setting = metricSelection.RetainedBytes ? false : true;
        setMetricSelection((prev) => ({...prev, RetainedBytes: setting}));
    }

    return (
        <>
        <div class="drawer">
            <input id="my-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content border-solid border-2 border-black-500">
                <div className="mt-4 flex justify-around">
                    <div class="btn-group">
                        <button className={mode === 'viewCluster' ? 'btn btn-accent' : 'btn'} onClick={changeModeViewCluster}>View Cluster</button>
                        <button className={mode === 'realtimeMonitoring' ? 'btn btn-accent' : 'btn'} onClick={changeModeRealtimeMonitoring}>Realtime Monitoring</button>
                        <button className={mode === 'clusterComparison' ? 'btn btn-accent' : 'btn'} onClick={changeModeClusterComparison}>Cluster Comparison</button>
                    </div>
                </div>
                <div className="flex justify-around pt-10">
                    {dashboardView}
                </div>
                {/* <!-- Page content here --> */}
            </div> 
            <AddClusterForm />
            <div class="drawer-side">
                <label for="my-drawer" class="drawer-overlay"></label>
                <ul class="menu p-4 w-80 bg-base-100 text-base-content">
                <li onClick={changeRetainedBytes} class={metricSelection.retainedBytes ? 'bg-secondary' : ''}><a>Retained bytes</a></li>
                <li onClick={changeReqResBytes} class={metricSelection.reqResBytes ? 'bg-secondary' : ''}><a>Request/Response bytes</a></li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default DashboardContainer


// <div class="drawer-side">
//                 <label for="my-drawer" class="drawer-overlay"></label>
//                 <ul class="menu p-4 w-80 bg-base-100 text-base-content">
//                 {/* <!-- Sidebar content here --> */}
//                 <h1 className='text-l font-bold'>Performance Metrics:</h1>
//                 <li onClick={changeBytesInPerSecMetric} class={metricSelection.bytesInPerSec ? 'bg-secondary' : ''}><a>Bytes-in/sec</a></li>
//                 <li onClick={changeBytesOutPerSecMetric} class={metricSelection.bytesOutPerSec ? 'bg-secondary' : ''}><a>Bytes-out/sec</a></li>
//                 <li onClick={changeShutdownOperationsTime} class={metricSelection.shutdownOperationsTime ? 'bg-secondary' : ''}><a>Shutdown Operations Time</a></li>
//                 <li onClick={changeRequestLatencyAvg} class={metricSelection.requestLatencyAvg ? 'bg-secondary' : ''}><a>Request Latency Average</a></li>
//                 <li onClick={changeIoWaitTimeAvg} class={metricSelection.ioWaitTimeAvg ? 'bg-secondary' : ''}><a>io Wait Time Average</a></li>
//                 <h1 className='text-l font-bold'>Content Metrics:</h1>
//                 </ul>
//             </div>