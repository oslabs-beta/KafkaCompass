import React, { useEffect, useState } from "react";
import AddClusterForm from "../components/add-cluster-form";
import Chart from "../components/chart";
import TopicButtons from "../components/topic-buttons";
import ClusterHistory from "./cluster-history";

const DashboardContainer = (props) => {
    const [chartData, setChart] = useState({topics: {labels: [], datasets: []}, 
                                            reqRes: {labels: [], datasets: []}});
    const [total, setTotal] = useState({totalRetainedBytes: 0, totalReq: 0, totalRes: 0});

    const [metricSelection, setMetricSelection] = useState({
        retainedBytes: true,
        reqResBytes: false
    });

    useEffect( () => {
        const getData = async() => {
            const response = await fetch('/api/metric');
            if (response.ok) {
                const data = await response.json();
                const retainedBytes = data.retained_bytes.metrics.map((topic) => topic.value);
                const topics = data.retained_bytes.metrics.map((topic) => topic.topic);
                const valuesReq =  data.request_bytes.metrics.map((topic) => topic.value);
                const valuesRes = data.response_bytes.metrics.map((topic) => topic.value);

                setTotal({totalRetainedBytes: data.retained_bytes.totalValue, 
                          totalReq: data.request_bytes.totalValue,
                          totalRes: data.response_bytes.totalValue
                        });
            

                setChart({
                    topics: {
                        labels: topics, 
                            datasets: [
                                {
                                label: 'bytes',
                                data: retainedBytes,
                                backgroundColor: 'rgba(64, 180, 179, 0.5)',
                                borderWidth: 1
                                }
                        ]
                    },
                    reqRes: {
                        labels: data.request_bytes.metrics.map((topic) => topic.type), 
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
                        ]
                    }
                });
            } else {
                console.log('Could not get data from the cluster');
            }
        }
        try {
            getData();
        } catch (err) {
            console.log('Network error occurred');
        }
    }, [])

    useEffect( () => {
        props.setRenderDrawerButton(true);
    }, []);

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
                    <><Chart chartData={chartData} 
                            topicChart={true}
                            reqResChart={false}
                            totalBytes={total.totalRetainedBytes} />
                      <TopicButtons 
                            chartData={chartData} 
                            setChart={setChart}
                            totalBytes={total}
                            setTotal={setTotal}
                             /></>}
                    {metricSelection.reqResBytes && 
                    <Chart chartData={chartData} 
                    topicChart={false}
                    reqResChart={true}
                    totalRes={total.totalRes}
                    totalReq={total.totalReq}
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
            <ClusterHistory />
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
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content border-solid border-2 border-black-500">
                <div className="mt-4 flex justify-around">
                    <div className="btn-group">
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
            <div className="drawer-side">
                <label for="my-drawer" class="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                <li onClick={() => updateSideDrawer('retainedBytes')} className={metricSelection.retainedBytes ? 'bg-secondary' : ''}><a>Retained bytes</a></li>
                <li onClick={() => updateSideDrawer('reqResBytes')} className={metricSelection.reqResBytes ? 'bg-secondary' : ''}><a>Request/Response bytes</a></li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default DashboardContainer
