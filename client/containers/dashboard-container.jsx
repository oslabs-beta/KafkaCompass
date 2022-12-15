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
            <div class="tool-bar border-solid border-2 border-indigo-600">
                <h2>Tool Bar</h2>
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