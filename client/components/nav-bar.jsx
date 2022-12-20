import React, { useState } from 'react';
import { render } from 'react-dom';

const Navbar = ({setDisplayAuth, renderDrawerButton, navigate}) => {

    let drawerButton=<></>;
    if (renderDrawerButton) {
        drawerButton = (
        <div class="flex-1">
            <label for="my-drawer" class="btn drawer-button mr-10 my-7">Select Metrics</label>
            <button onClick={() => {
                    navigate('/cluster-history');
                }}className="btn btn-outline mr-10 my-7">Cluster History</button>
            <label for="my-modal-4" class="btn btn-outline ">Add New Cluster</label>
        </div>);
    }

    return (
        <div className="navbar">
            {drawerButton}
            <button onClick={() => {
                      setDisplayAuth('signup');
                      navigate('/auth');
                    }} 
                    className="btn btn-outline mr-10 my-7">Sign Up</button>
            <button onClick={() => {
                      setDisplayAuth('login');
                      navigate('/auth');
                      }} 
                      className="btn btn-accent btn-outline mr-10 my-7">Log In </button>
        </div>
    )
}

export default Navbar;