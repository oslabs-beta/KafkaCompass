import React, { useState } from 'react';
import { render } from 'react-dom';

const Navbar = (props) => {

    const { renderDrawerButton } = props;
    let drawerButton=<></>;
    if (renderDrawerButton) {
        drawerButton = (
        <div class="flex-1">
            <label for="my-drawer" class="btn btn-primary drawer-button mr-10 my-7">Select Metrics</label>
            <button className="btn btn-secondary btn-outline mr-10 my-7">Cluster History</button>
            <button className="btn btn-secondary mr-10 my-7">Add New Cluster</button>
        </div>);
    }

    return (
        <div className="navbar">
            {drawerButton}
            <button className="btn btn-outline mr-10 my-7">Sign Up</button>
            <button onClick={() => props.handleLogin()} className="btn btn-accent btn-outline mr-10 my-7">Log In </button>
        </div>
    )
}

export default Navbar;