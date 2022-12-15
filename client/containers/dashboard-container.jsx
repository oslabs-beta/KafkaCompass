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
            <div class="tool-bar">Tool Bar</div>
            <div class="view-container">View Container</div>
        </div>
        </>
    )
}

export default DashboardContainer