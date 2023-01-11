import React, { useEffect, useState } from "react";

const SwitchCluster = ({
  cluster,
  setCluster,
  clusterAdded,
  setClusterAdded
}) => {
  const [clusterNames, setClusterNames] = useState([]);
  // const clusterNames = ["pig", "soup", "human"];
  const [clusterSelection, setClusterSelection] = useState(0);

  useEffect(() => {
    async function getClusterList() {
      try {
        const response = await fetch("/api/getClusterList");
        const clusterList = await response.json();
        setClusterNames(clusterList);
      } catch (err) {
        console.log("Network error occurred - could not get cluste list");
      }
    }
    getClusterList();
  }, [clusterAdded]);

  // useEffect(() => {}, [clusterSelection]);

  async function switchCluster() {
    try {
      const response = await fetch("/api/switchCluster", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cluster: clusterSelection })
      });
    } catch (err) {
      console.log("Network error occurred - could not switch cluster");
    }
    setCluster(clusterSelection);
  }

  return (
    <>
      <input
        type="checkbox"
        id="switch-cluster-modal"
        className="modal-toggle"
      />
      <label htmlFor="switch-cluster-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="mb-4 text-lg font-bold">Cluster Name:</h3>
          <div className="form-control w-full max-w-xs">
            <select
              onChange={(e) => {
                let index = 0;
                for (let i = 0; i < clusterNames.length; i++) {
                  if (e.target.value === clusterNames[i]) {
                    index = i;
                    break;
                  }
                }
                setClusterSelection(index);
              }}
              className="select w-full max-w-xs"
            >
              <option disabled selected>
                Choose a cluster
              </option>
              {clusterNames.map((name, index) => (
                <option key={name}>{name}</option>
              ))}
            </select>

            <div className="pt-4 mt-2 modal-action">
              <label
                htmlFor="switch-cluster-modal"
                className="btn btn-accent"
                onClick={switchCluster}
              >
                Choose Cluster
              </label>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};

export default SwitchCluster;
