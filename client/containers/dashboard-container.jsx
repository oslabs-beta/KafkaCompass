import React, { useEffect, useState } from "react";
import { redirect } from "react-router";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/nav-bar";

const DashboardContainer = (props) => {

    const [mode, setMode] = useState('realtime');

    return (
        // <>
        // <h1 >
        //     DashboardContainer!
        // </h1>
        // <div class="dashboard-container">
        //     <div class="nav-bar">Nav Bar</div>
        //     <div class="tool-bar border-solid border-2 border-indigo-600 ">
        //         <h2>Tool Bar</h2>
        //     </div>
        //     <div className="view-container border-solid border-2 border-indigo-600 text-red-500">
        //         <h2>View Container</h2>
        //         <div>Views!</div>
        //     </div>
        // </div>
        // </>
           // <>
        <>
        <Navbar renderDrawerButton={true}/>
        <div class="drawer">
            <input id="my-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                <div className="flex justify-around">
                    <div class="btn-group">
                        <button class="btn btn-active">Realtime Monitoring</button>
                        <button class="btn">Cluster Comparison</button>
                    </div>
                </div>
                {/* <!-- Page content here --> */}
            </div> 
            <div class="drawer-side">
                <label for="my-drawer" class="drawer-overlay"></label>
                <ul class="menu p-4 w-80 bg-base-100 text-base-content">
                {/* <!-- Sidebar content here --> */}
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default DashboardContainer