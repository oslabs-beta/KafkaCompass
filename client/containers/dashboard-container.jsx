import React, { useState } from "react";
import { redirect } from "react-router";
import { useNavigate } from 'react-router-dom';

const DashboardContainer = (props) => {

    return (
        <>
        <h1 >
            DashboardContainer!
        </h1>
        <div class="container">
            <div class="nav-bar">Nav Bar</div>
            <div class="tool-bar">
                <h2>Tool Bar</h2>
                <div><button className="btn btn-accent btn-outline">Dashboard Button</button></div>
                <div><button className="btn btn-primary">Dashboard Button 2</button></div>
                <div><button className="btn btn-secondary">Dashboard Button 2</button></div>
                <div><button className="btn rounded-full">Dashboard Button 2</button></div>

            </div>
            <div class="view-container">View Container</div>
        </div>
        </>
    )
}

export default DashboardContainer