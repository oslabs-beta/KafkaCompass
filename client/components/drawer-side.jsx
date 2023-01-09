import React, { useContext } from "react";
import { NavbarContext } from "../NavbarContext";

const DrawerSide = ({ metricSelection, updateSideDrawer }) => {
  const { sideBarMode, setSideBarMode } =
    useContext(NavbarContext).sideBarState;

  const choices = {
    retained_bytes: "Retained Bytes",
    sent_bytes: "Sent Bytes",
    received_records: "Received Records",
    sent_records: "Sent Records",
    request_bytes: "Request Bytes",
    response_bytes: "Response Bytes",
    request_count: "Request Counts",
    req_res: "Request/Response bytes"
  };

  const listItems = Object.keys(choices).map((key) => (
    <li
      onClick={() => updateSideDrawer(key)}
      className={metricSelection === key ? "bg-secondary" : ""}
    >
      <a>{choices[key]}</a>
    </li>
  ));

  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer" className="drawer-overlay"></label>
      <ul className="menu p-4 w-80 bg-base-100 text-base-content">
        {listItems}
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
