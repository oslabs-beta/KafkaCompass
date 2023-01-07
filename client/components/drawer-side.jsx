import React, { useContext } from "react";
import { NavbarContext } from "../NavbarContext";

const DrawerSide = ({ metricSelection, updateSideDrawer }) => {
  const { sideBarMode, setSideBarMode } =
    useContext(NavbarContext).sideBarState;

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-base-100 text-base-content">
        <li
          onClick={() => updateSideDrawer("retainedBytes")}
          className={metricSelection.retainedBytes ? "bg-secondary" : ""}
        >
          <a>Retained bytes</a>
        </li>
        <li
          onClick={() => updateSideDrawer("reqResBytes")}
          className={metricSelection.reqResBytes ? "bg-secondary" : ""}
        >
          <a>Request/Response bytes</a>
        </li>
        <div className="divider"></div>
        <li onClick={() => setSideBarMode("history")}>
          <a>Cluster History</a>
        </li>
        {sideBarMode === "history" && (
          <li onClick={() => setSideBarMode("current")}>
            <a>Back to current cluster</a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DrawerSide;
