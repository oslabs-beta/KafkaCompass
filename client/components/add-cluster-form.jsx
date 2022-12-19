import React, { useState } from 'react';

const AddClusterForm = () => {
    
     //keeps track of user inputs in 'Add New Cluster' form
     const [newAPIKeyInput, setNewAPIKeyInput] = useState('');
     const [newAPISecretInput, setNewAPISecretInput] = useState('');
     const [newCloudKeyInput, setNewCloudKeyInput] = useState('');
     const [newCloudSecretInput, setNewCloudSecretInput] = useState('');
     const [newRESTEndpointInput, setNewRESTEndpointInput] = useState('');
     const [newClusterIdInput, setNewClusterIdInput] = useState('');

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
        catch (err) {
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
        </>
    )
}

export default AddClusterForm;