import React, { useState } from "react";

const DeleteTopic = ({ onDelete, chartData }) => {
  const [topic, setTopic] = useState("");
  const topicNames = chartData.topics.labels;

  return (
    <>
      <input type="checkbox" id="topic-delete-modal" className="modal-toggle" />
      <label htmlFor="topic-delete-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="mb-4 text-lg font-bold">Topic name:</h3>
          <div className="form-control w-full max-w-xs">
            <select
              onChange={(e) => {
                setTopic(e.target.value);
              }}
              className="select w-full max-w-xs"
            >
              <option disabled selected>
                Choose a topic to delete
              </option>
              {topicNames.map((t) => (
                <option>{t}</option>
              ))}
            </select>

            <div className="pt-4 mt-2 modal-action">
              <label
                htmlFor="topic-delete-modal"
                className="btn btn-accent"
                onClick={() => onDelete(topic)}
              >
                Delete topic
              </label>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};

export default DeleteTopic;
