import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddClusterForm from '../components/add-cluster-form';
import ClusterItem from '../components/cluster-item';

const ClusterHistory = (props) => {
  const navigate = useNavigate();
  useEffect( () => {
    props.setDrawerButton(true);
  });

  const backToDashboard = () => {
    console.log('Go Home button clicked');
    navigate('/dashboard');
  };

  //get cluster items from db
  //render cluster items
  const clusterItems=[];
  for (let i = 0; i < 3; i++) {
    clusterItems.push(<ClusterItem/>)
  };

  return (
    <>
    <div>
      <h1 className='text-center text-xl font-bold'>Cluster History</h1>
      {clusterItems}
      <div className='flex justify-around'><button onClick={backToDashboard} className='btn'>Return to Dashboard</button></div>
    </div>
    <input type="checkbox" id="my-modal-4" class="modal-toggle" />
    <AddClusterForm />
    </>
  );
};

export default ClusterHistory;