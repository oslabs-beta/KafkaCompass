import React, { useState } from "react";

const AddMessage = ({ onCreate }) => {
  const [topic, setTopic] = useState("");

  return (
    <>
      <input type="checkbox" id="topic-create-modal" className="modal-toggle" />
      <label htmlFor="topic-create-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="mb-4 text-lg font-bold">Topic name:</h3>
          <div className="form-control w-full max-w-xs">
            <input
              type="text"
              placeholder="New topic"
              onChange={(e) => setTopic(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <div className="pt-4 mt-2 modal-action">
              <label
                htmlFor="topic-create-modal"
                className="btn btn-accent"
                onClick={() => onCreate(topic)}
              >
                Create topic
              </label>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};

export default AddMessage;
