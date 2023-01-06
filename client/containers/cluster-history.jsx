import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddClusterForm from "../components/add-cluster-form";
import ClusterItem from "../components/cluster-item";
import { NavbarContext } from "../NavbarContext";

const ClusterHistory = (props) => {
  const navigate = useNavigate();
  const metrics = useContext(NavbarContext).userState.user.metric;
  const { setRenderDrawerButton } =
    useContext(NavbarContext).drawerButtonsState;

  useEffect(() => {
    setRenderDrawerButton(true);
  });

  const backToDashboard = () => {
    navigate("/dashboard");
  };

  //get cluster items from db
  // render cluster items
  const clusterItems = metrics.map((metric, idx) => {
    return (
      <ClusterItem
        index={idx}
        key={metric._id}
        date={metric.created_at}
        clusterId={metric.clusterId}
        setMetricIndex={props.setMetricIndex}
        navigate={navigate}
      />
    );
  });

  return (
    <>
      <div>
        <h1 className="text-center text-xl font-bold">Cluster History</h1>
        <div className="flex justify-around">
          <button onClick={backToDashboard} className="btn">
            Return to Dashboard
          </button>
        </div>
        {clusterItems}
      </div>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <AddClusterForm />
    </>
  );
};

export default ClusterHistory;
