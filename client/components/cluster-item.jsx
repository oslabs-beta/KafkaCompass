import React from 'react';

const ClusterItem = (props) => {

  return (
    <div className='flex justify-around'>
        <div class="card w-96 bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Cluster Item</h2>
                <p>Date: </p>
                <p>Cluster ID: </p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">View Metrics</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ClusterItem;