import React, { useEffect, useState } from "react";
import AddClusterForm from "../components/add-cluster-form";
import Topics from "../components/topics";


const DashboardContainer = (props) => {
    useEffect( () => {
        props.setDrawerButton(true);
    });

    // dictates the view mode on dashbaord
    const [mode, setMode] = useState('viewCluster');
    // keeps track of user-selected metrics
    const [metricSelection, setMetricSelection] = useState({
        bytesInPerSec: false,
        bytesOutPerSec: false,
        shutdownOperationsTime: false,
        requestLatencyAvg: false,
        ioWaitTimeAvg: false,
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
            <div className="cluster-container">
                <button className = 'btn btn-accent'>Choose Cluster</button>
                <Topics />
            </div>
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
    function changeBytesInPerSecMetric () {
        const setting = metricSelection.bytesInPerSec ? false : true;
        setMetricSelection((prev) => ({...prev, bytesInPerSec: setting}));
    }
    function changeBytesOutPerSecMetric () {
        const setting = metricSelection.bytesOutPerSec ? false : true;
        setMetricSelection((prev) => ({...prev, bytesOutPerSec: setting}));
    }
    function changeShutdownOperationsTime () {
        const setting = metricSelection.shutdownOperationsTime ? false : true;
        setMetricSelection((prev) => ({...prev, shutdownOperationsTime: setting}));
    }
    function changeShutdownOperationsTime () {
        const setting = metricSelection.shutdownOperationsTime ? false : true;
        setMetricSelection((prev) => ({...prev, shutdownOperationsTime: setting}));
    }
    function changeRequestLatencyAvg () {
        const setting = metricSelection.requestLatencyAvg ? false : true;
        setMetricSelection((prev) => ({...prev, requestLatencyAvg: setting}));
    }
    function changeIoWaitTimeAvg () {
        const setting = metricSelection.ioWaitTimeAvg ? false : true;
        setMetricSelection((prev) => ({...prev, ioWaitTimeAvg: setting}));
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
                {/* <!-- Sidebar content here --> */}
                <h1 className='text-l font-bold'>Performance Metrics:</h1>
                <li onClick={changeBytesInPerSecMetric} class={metricSelection.bytesInPerSec ? 'bg-secondary' : ''}><a>Bytes-in/sec</a></li>
                <li onClick={changeBytesOutPerSecMetric} class={metricSelection.bytesOutPerSec ? 'bg-secondary' : ''}><a>Bytes-out/sec</a></li>
                <li onClick={changeShutdownOperationsTime} class={metricSelection.shutdownOperationsTime ? 'bg-secondary' : ''}><a>Shutdown Operations Time</a></li>
                <li onClick={changeRequestLatencyAvg} class={metricSelection.requestLatencyAvg ? 'bg-secondary' : ''}><a>Request Latency Average</a></li>
                <li onClick={changeIoWaitTimeAvg} class={metricSelection.ioWaitTimeAvg ? 'bg-secondary' : ''}><a>io Wait Time Average</a></li>
                <h1 className='text-l font-bold'>Content Metrics:</h1>
                </ul>
            </div>
        </div>
        </>
    )
}

export default DashboardContainer