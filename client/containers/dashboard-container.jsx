import React, { useEffect, useState } from "react";
import { redirect } from "react-router";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/nav-bar";

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
    //keeps track of user inputs in 'Add New Cluster' form
    const [newAPIKeyInput, setNewAPIKeyInput] = useState('');
    const [newAPISecretInput, setNewAPISecretInput] = useState('');
    const [newCloudKeyInput, setNewCloudKeyInput] = useState('');
    const [newCloudSecretInput, setNewCloudSecretInput] = useState('');
    const [newRESTEndpointInput, setNewRESTEndpointInput] = useState('');
    const [newClusterIdInput, setNewClusterIdInput] = useState('');
    
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
            <button className = 'btn btn-secondary'>Choose Cluster</button>
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

    // manage new cluster input fields and submitting new cluster
    function updateNewAPIKeyInput (e) {
        setNewAPIKeyInput(e.target.value);
    }
    function updateNewAPISecretInput (e) {
        setNewAPISecretInput(e.target.value);
    }
    function updateNewCloudKeyInput (e) {
        setNewCloudKeyInput(e.target.value);
    }
    function updateNewCloudSecretInput (e) {
        setNewCloudSecretInput(e.target.value);
    }
    function updateNewRESTEndpointInput (e) {
        setNewRESTEndpointInput(e.target.value);
    }
    function updateNewClusterIdInput (e) {
        setNewClusterIdInput(e.target.value);
    }
    async function submitNewCluster () {
        // create object to send to db
        try {
            const newCluster = {
                API_KEY: newAPIKeyInput,
                API_SECRET: newAPISecretInput,
                CLOUD_KEY: newCloudKeyInput,
                CLOUD_SECRET: newCloudSecretInput,
                clusterId: newClusterIdInput,
                RESTendpoint: newRESTEndpointInput,
            }
            console.log('newCluster: ', newCluster);
            // send post request to backend
            const data = await fetch ('/api/cloudAuth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify(newCluster)
            })
            const response = await response.json();
            if (response.ok) {
                console.log('cluster added')
            }
            else {
                console.log('error adding cluster')
            }
        }
        catch (pizza) {
            console.log('network error')
        }

        //add functionality here to tell user if cluster was successfully added to DB, using status code as indicator
        //maybe a green banner saying request was successful and red if not successful
        //fields will clear out if this cluster was successfully added
        setNewAPIKeyInput('');
        setNewAPISecretInput('');
        setNewCloudKeyInput('');
        setNewCloudSecretInput('');
        setNewRESTEndpointInput('');
        setNewClusterIdInput('');
    }

    return (
        <>
        <div class="drawer">
            <input id="my-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content border-solid border-2 border-black-500">
                <div className="flex justify-around">
                    <div class="btn-group">
                        <button className={mode === 'viewCluster' ? 'btn btn-active' : 'btn'} onClick={changeModeViewCluster}>View Cluster</button>
                        <button className={mode === 'realtimeMonitoring' ? 'btn btn-active' : 'btn'} onClick={changeModeRealtimeMonitoring}>Realtime Monitoring</button>
                        <button className={mode === 'clusterComparison' ? 'btn btn-active' : 'btn'} onClick={changeModeClusterComparison}>Cluster Comparison</button>
                    </div>
                </div>
                <div className="flex justify-around pt-10">
                    {dashboardView}
                </div>
                <input type="checkbox" id="my-modal-4" class="modal-toggle" />
                <label for="my-modal-4" class="modal cursor-pointer">
                    <label class="modal-box relative" for="">
                        <h3 class="text-lg font-bold">Input Cluster Details:</h3>
                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">API Key:</span>
                            </label>
                            <input type="text" placeholder="API Key" class="input input-bordered w-full max-w-xs" onChange={updateNewAPIKeyInput} value={newAPIKeyInput}/>
                            <label class="label">
                                <span class="label-text">API Secret:</span>
                            </label>
                            <input type="text" placeholder="API Secret" class="input input-bordered w-full max-w-xs" onChange={updateNewAPISecretInput} value={newAPISecretInput}/>
                            <label class="label">
                                <span class="label-text">Cloud Key</span>
                            </label>
                            <input type="text" placeholder="Cloud Key" class="input input-bordered w-full max-w-xs" onChange={updateNewCloudKeyInput} value={newCloudKeyInput}/>
                            <label class="label">
                                <span class="label-text">Cloud Secret</span>
                            </label>
                            <input type="text" placeholder="Cloud Secret" class="input input-bordered w-full max-w-xs" onChange={updateNewCloudSecretInput} value={newCloudSecretInput}/>
                            <label class="label">
                                <span class="label-text">REST Endpoint</span>
                            </label>
                            <input type="text" placeholder="REST Endpoint" class="input input-bordered w-full max-w-xs" onChange={updateNewRESTEndpointInput} value={newRESTEndpointInput}/>
                            <label class="label">
                                <span class="label-text">Cluster ID:</span>
                            </label>
                            <input type="text" placeholder="Cluster ID" class="input input-bordered w-full max-w-xs" onChange={updateNewClusterIdInput} value={newClusterIdInput}/>
                            <div className = 'pt-4'>
                                <button className = 'btn btn-primary' onClick={submitNewCluster}>Submit</button>
                            </div>
                        </div>
                    </label>
                </label>
                {/* <!-- Page content here --> */}
            </div> 
            <div class="drawer-side">
                <label for="my-drawer" class="drawer-overlay"></label>
                <ul class="menu p-4 w-80 bg-base-100 text-base-content">
                {/* <!-- Sidebar content here --> */}
                <li onClick={changeBytesInPerSecMetric} class={metricSelection.bytesInPerSec ? 'bg-secondary' : ''}><a>Bytes-in/sec</a></li>
                <li onClick={changeBytesOutPerSecMetric} class={metricSelection.bytesOutPerSec ? 'bg-secondary' : ''}><a>Bytes-out/sec</a></li>
                <li onClick={changeShutdownOperationsTime} class={metricSelection.shutdownOperationsTime ? 'bg-secondary' : ''}><a>Shutdown Operations Time</a></li>
                <li onClick={changeRequestLatencyAvg} class={metricSelection.requestLatencyAvg ? 'bg-secondary' : ''}><a>Request Latency Average</a></li>
                <li onClick={changeIoWaitTimeAvg} class={metricSelection.ioWaitTimeAvg ? 'bg-secondary' : ''}><a>io Wait Time Average</a></li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default DashboardContainer