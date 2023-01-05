import React, { useState } from 'react';

const AddClusterForm = () => {
  //keeps track of user inputs in 'Add New Cluster' form
  const [newAPIKeyInput, setNewAPIKeyInput] = useState('');
  const [newAPISecretInput, setNewAPISecretInput] = useState('');
  const [newCloudKeyInput, setNewCloudKeyInput] = useState('');
  const [newCloudSecretInput, setNewCloudSecretInput] = useState('');
  const [newRESTEndpointInput, setNewRESTEndpointInput] = useState('');
  const [newClusterIdInput, setNewClusterIdInput] = useState('');
  const [newBootstrapServerInput, setNewBootstrapServerInput] = useState('');
  const [newClusterName, setNewClusterName] = useState('');

  // submit new cluster
  async function submitNewCluster() {
    // create object to send to db
    try {
      const newCluster = {
        API_KEY: newAPIKeyInput,
        API_SECRET: newAPISecretInput,
        CLOUD_KEY: newCloudKeyInput,
        CLOUD_SECRET: newCloudSecretInput,
        clusterId: newClusterIdInput,
        RESTendpoint: newRESTEndpointInput,
        bootstrapServer: newBootstrapServerInput,
        cluster_name: newClusterName,
      };
      console.log('newCluster: ', newCluster);
      // send post request to backend
      const data = await fetch('/api/cloud-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCluster),
      });
      const response = await response.json();
      if (response.ok) {
        console.log('cluster added');
      } else {
        console.log('error adding cluster');
      }
    } catch (err) {
      console.log('network error');
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
    setNewBootstrapServerInput('');
    setNewClusterName('');
  }

  return (
    <>
      <input type='checkbox' id='my-modal-4' class='modal-toggle' />
      <label for='my-modal-4' class='modal cursor-pointer'>
        <label class='modal-box relative' for=''>
          <h3 class='text-lg font-bold'>Input Cluster Details:</h3>
          <div class='form-control w-full max-w-xs'>
            <label class='label'>
              <span class='label-text'>Cluster Name:</span>
            </label>
            <input
              type='text'
              placeholder='Cluster Name'
              class='input input-bordered w-full max-w-xs'
              onChange={(e) => setNewClusterName(e.target.value)}
              value={newClusterName}
            />
            <label class='label'>
              <span class='label-text'>API Key:</span>
            </label>
            <input
              type='text'
              placeholder='API Key'
              class='input input-bordered w-full max-w-xs'
              onChange={(e) => setNewAPIKeyInput(e.target.value)}
              value={newAPIKeyInput}
            />
            <label class='label'>
              <span class='label-text'>API Secret:</span>
            </label>
            <input
              type='text'
              placeholder='API Secret'
              class='input input-bordered w-full max-w-xs'
              onChange={(e) => setNewAPISecretInput(e.target.value)}
              value={newAPISecretInput}
            />
            <label class='label'>
              <span class='label-text'>Cloud Key</span>
            </label>
            <input
              type='text'
              placeholder='Cloud Key'
              class='input input-bordered w-full max-w-xs'
              onChange={(e) => setNewCloudKeyInput(e.target.value)}
              value={newCloudKeyInput}
            />
            <label class='label'>
              <span class='label-text'>Cloud Secret</span>
            </label>
            <input
              type='text'
              placeholder='Cloud Secret'
              class='input input-bordered w-full max-w-xs'
              onChange={(e) => setNewCloudSecretInput(e.target.value)}
              value={newCloudSecretInput}
            />
            <label class='label'>
              <span class='label-text'>REST Endpoint</span>
            </label>
            <input
              type='text'
              placeholder='REST Endpoint'
              class='input input-bordered w-full max-w-xs'
              onChange={(e) => setNewRESTEndpointInput(e.target.value)}
              value={newRESTEndpointInput}
            />
            <label class='label'>
              <span class='label-text'>Cluster ID:</span>
            </label>
            <input
              type='text'
              placeholder='Cluster ID'
              class='input input-bordered w-full max-w-xs'
              onChange={(e) => setNewClusterIdInput(e.target.value)}
              value={newClusterIdInput}
            />
            <div className='pt-4'>
              <label class='label'>
                <span class='label-text'>Bootstrap Server:</span>
              </label>
              <input
                type='text'
                placeholder='Bootstrap Server'
                class='input input-bordered w-full max-w-xs'
                onChange={(e) => setNewBootstrapServerInput(e.target.value)}
                value={newBootstrapServerInput}
              />
              <div className='pt-4'></div>
              <button className='btn btn-primary' onClick={submitNewCluster}>
                Submit
              </button>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};

export default AddClusterForm;
