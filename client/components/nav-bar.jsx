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
            <label for="my-modal-4" class="btn">Add New Cluster</label>
        </div>);
    }

    return (
        <div className="navbar">
            {drawerButton}
            <button onClick={() => props.handleAuth('signup')} className="btn btn-outline mr-10 my-7">Sign Up</button>
            <button onClick={() => props.handleAuth('login')} className="btn btn-accent btn-outline mr-10 my-7">Log In </button>
        </div>
    )
}

export default Navbar;