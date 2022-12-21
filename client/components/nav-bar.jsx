import React, { useState } from 'react';
import { render } from 'react-dom';

const Navbar = ({setDisplayAuth, navigate, checkLoggedIn, renderDrawerButton, setDrawerButton, setLoggedIn, logUserOut}) => {

    let drawerButton=<></>;
    if (renderDrawerButton) {
        drawerButton = (
        <div className="flex-1">
            <label htmlFor="my-drawer" className="btn drawer-button mr-10 my-7">Select Metrics</label>
            <button onClick={() => {
                    navigate('/cluster-history');
                }} className="btn btn-outline mr-10 my-7">Cluster History</button>
            <label htmlFor="my-modal-4" className="btn btn-outline ">Add New Cluster</label>
        </div>);
    }

    let logButtons=<></>
    if (checkLoggedIn === false) {
    logButtons = ( <div>
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
    } else {
    logButtons = (<div>
        <button onClick={() => {
            setDrawerButton(false);
            navigate('/');
        }}
        className="btn btn-outline mr-10 my-7">Home</button>

        <button onClick={() => {
            logUserOut();
            setDrawerButton(false);
            setLoggedIn(false);
            navigate('/');
        }}
        className="btn btn-outline mr-10 my-7">Logout</button>
    </div>
    )
    }

    return (
        <div className="navbar">
            {drawerButton}
            {logButtons}
        </div>
    )
    
}

export default Navbar;