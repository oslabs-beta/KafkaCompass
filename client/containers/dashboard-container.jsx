import React, { useEffect, useState } from "react";
import AddClusterForm from "../components/add-cluster-form";
import Chart from "../components/chart";
import TopicButtons from "../components/topic-buttons";

const mockData = {
    retained_bytes: {
        name: "confluent_kafka_server_retained_bytes",
        description: "The current count of bytes retained by the cluster. The count is sampled every 60 seconds.",
        totalValue: 81703,
        metrics: [
          { value: "57995.0", topic: "orders" },
          { value: "588.0", topic: "poems" },
          { value: "23120.0", topic: "stock-trade" }
        ]
    },
    request_bytes: {
        name: "confluent_kafka_server_request_bytes",
        description: "The delta count of total request bytes from the specified request types sent over the network. Each sample is the number of bytes sent since the previous data point. The count is sampled every 60 seconds.",
        totalValue: 7343,
        metrics: [
          { value: "63.0", type: "ApiVersions" },
          { value: "0.0", type: "CreateTopics" },
          { value: "0.0", type: "DescribeCluster" },
          { value: "0.0", type: "DescribeClusterLinks" },
          { value: "0.0", type: "DescribeConfigs" },
          { value: "0.0", type: "DescribeGroups" },
          { value: "4606.0", type: "Fetch" },
          { value: "0.0", type: "FindCoordinator" },
          { value: "623.0", type: "Heartbeat" },
          { value: "0.0", type: "JoinGroup" },
          { value: "0.0", type: "ListGroups" },
          { value: "0.0", type: "ListMirrors" },
          { value: "0.0", type: "ListOffsets" },
          { value: "510.0", type: "Metadata" },
          { value: "1350.0", type: "OffsetFetch" },
          { value: "191.0", type: "SyncGroup" }
    ]},
    response_bytes: {
        name: "confluent_kafka_server_response_bytes",
        description: "The delta count of total response bytes from the specified response types sent over the network. Each sample is the number of bytes sent since the previous data point. The count is sampled every 60 seconds.",
        totalValue: 20300,
        metrics: [
          { value: "684.0", type: "ApiVersions" },
          { value: "0.0", type: "CreateTopics" },
          { value: "0.0", type: "DescribeCluster" },
          { value: "0.0", type: "DescribeClusterLinks" },
          { value: "0.0", type: "DescribeConfigs" },
          { value: "0.0", type: "DescribeGroups" },
          { value: "3268.0", type: "Fetch" },
          { value: "0.0", type: "FindCoordinator" },
          { value: "98.0", type: "Heartbeat" },
          { value: "210.0", type: "JoinGroup" },
          { value: "0.0", type: "ListGroups" },
          { value: "0.0", type: "ListMirrors" },
          { value: "0.0", type: "ListOffsets" },
          { value: "13708.0", type: "Metadata" },
          { value: "2268.0", type: "OffsetFetch" },
          { value: "64.0", type: "SyncGroup" }
        ]
      }
}


const DashboardContainer = (props) => {
    // topic and req-res chart data for the chats
    const [topicChart, setTopics] = useState({labels: [], datasets: []});
    const [reqResChart, setReqRes] = useState({labels: [], datasets: []});


    const [totalBytes, setTotal] = useState();
    const [totalRes, setTotalRes] = useState();
    const [totalReq, setTotalReq] = useState();
    const [metricSelection, setMetricSelection] = useState({
        retainedBytes: true,
        reqResBytes: false
    });

    // // Mock useEffect;
    // useEffect(() => {
    //     const retainedValues = mockData.retained_bytes.metrics.map((topic) => topic.value);
    //     setTotal(mockData.retained_bytes.totalValue);
    //     setTopics({labels: mockData.retained_bytes.metrics.map((topic) => topic.topic), 
    //         datasets: [
    //             {
    //             label: 'bytes',
    //             data: retainedValues,
    //             backgroundColor: 'rgba(64, 180, 179, 0.5)',
    //             borderWidth: 1
    //             }
    //     ]});
        
    //     const valuesReq =  mockData.request_bytes.metrics.map((topic) => topic.value);
    //     const valuesRes = mockData.response_bytes.metrics.map((topic) => topic.value);
    //     setTotalReq(mockData.request_bytes.totalValue);
    //     setTotalRes(mockData.response_bytes.totalValue);
    //     setReqRes({labels: mockData.request_bytes.metrics.map((topic) => topic.type), 
    //         datasets: [
    //             {
    //             label: 'request bytes',
    //             data: valuesReq,
    //             backgroundColor: 'rgba(64, 180, 179, 0.5)',
    //             borderWidth: 1
    //             },
    //             {
    //             label: 'response bytes',
    //             data: valuesRes,
    //             backgroundColor: 'rgba(250, 73, 112, 0.5)',
    //             borderWidth: 1
    //             }
    //       ]});
    //   }, []);
    
    // real useEffect
    useEffect( () => {
        const getData = async() => {
            const response = await fetch('/api/metric');
            console.log(response);
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                const retainedValues = data.retained_bytes.metrics.map((topic) => topic.value);
                setTotal(data.retained_bytes.totalValue);
                setTopics({labels: data.retained_bytes.metrics.map((topic) => topic.topic), 
                    datasets: [
                        {
                        label: 'bytes',
                        data: retainedValues,
                        backgroundColor: 'rgba(64, 180, 179, 0.5)',
                        borderWidth: 1
                        }
                ]});
        
                const valuesReq =  data.request_bytes.metrics.map((topic) => topic.value);
                const valuesRes = data.response_bytes.metrics.map((topic) => topic.value);
                setTotalReq(data.request_bytes.totalValue);
                setTotalRes(data.response_bytes.totalValue);
                setReqRes({labels: data.request_bytes.metrics.map((topic) => topic.type), 
                    datasets: [
                        {
                        label: 'request bytes',
                        data: valuesReq,
                        backgroundColor: 'rgba(64, 180, 179, 0.5)',
                        borderWidth: 1
                        },
                        {
                        label: 'response bytes',
                        data: valuesRes,
                        backgroundColor: 'rgba(250, 73, 112, 0.5)',
                        borderWidth: 1
                        }
                ]});
            }
        }
        try { 
            getData();
        } catch(err) {
            console.log('Network error');
        }
    }, []);

    useEffect( () => {
        props.setDrawerButton(true);
    });

    // dictates the view mode on dashbaord
    const [mode, setMode] = useState('viewCluster');
    
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
                    {metricSelection.retainedBytes &&
                    <><Chart chartData={topicChart} 
                            totalBytes={totalBytes} />
                      <TopicButtons 
                            chartData={topicChart} 
                            setTopics={setTopics}
                            totalBytes={totalBytes} /></>}
                    {metricSelection.reqResBytes && 
                    <Chart chartData={reqResChart} 
                    totalRes={totalRes}
                    totalReq={totalReq}
                     />
                    }
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
    function updateSideDrawer (next) {
        const metrics = metricSelection;
        for (let key in metrics) {
            if (metrics[key] === true) metrics[key] = false;

            if (key === next) metrics[key] = true;
        }
        setMetricSelection(metrics);
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
                <li onClick={() => updateSideDrawer('retainedBytes')} class={metricSelection.retainedBytes ? 'bg-secondary' : ''}><a>Retained bytes</a></li>
                <li onClick={() => updateSideDrawer('reqResBytes')} class={metricSelection.reqResBytes ? 'bg-secondary' : ''}><a>Request/Response bytes</a></li>
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