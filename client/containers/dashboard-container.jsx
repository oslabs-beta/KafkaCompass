import React, { useState } from "react";
import { redirect } from "react-router";
import { useNavigate } from 'react-router-dom';

const DashboardContainer = (props) => {

    return (
        <>
        <h1 >
            DashboardContainer!
        </h1>
        <div class="dashboard-container">
            <div class="nav-bar">Nav Bar</div>
            <div class="tool-bar">
                <h2>Tool Bar</h2>
                <div><button className="btn btn-accent btn-outline">Dashboard Button</button></div>
                <div><button className="btn btn-primary">Dashboard Button 2</button></div>
                <div><button className="btn text-red-500">Dashboard Button 2</button></div>
                <div><button className="btn rounded-full font-style: italic">Dashboard Button 2</button></div>
                <div><button className="btn border-color: #60A5FA;">Dashboard Button 2</button></div>
                <div><button className="btn">Dashboard Button 2</button></div>
            </div>
            <div className="view-container border-solid border-2 border-indigo-600">
                <h2>View Container</h2>
                <div>Views!</div>
            </div>
        </div>
        </>
    )
}

export default DashboardContainer