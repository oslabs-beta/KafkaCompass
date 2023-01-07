import React, { useEffect, useState } from "react";

const AddMessage = ({ onCreate, topic }) => {
  // const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");
  const [topicList, setTopicList] = useState([]);

  //I use an identical function to get topic list as sibling button here, I'll plan on putting this higher in state later
  useEffect(() => {
    fetch("/api/topic")
      .then((res) => res.json())
      .then((data) => {
        console.log("data is :", data);
        setTopicList(data);
      })
      .catch(() => {
        console.log("ERROR");
      });
  }, []);

  return (
    <>
      <input type="checkbox" id="message-add-modal" className="modal-toggle" />
      <label htmlFor="message-add-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="mb-4 text-lg font-bold">Write a message:</h3>
          <div className="form-control w-full max-w-xs">
            <p className="mb-5">{"Current topic: " + topic}</p>
            {/* <select
              onChange={(e) => {
                setTopic(e.target.value);
              }}
              className="select w-full max-w-xs"
            >
              <option disabled selected>
                Choose a topic to insert message:
              </option>
              {topic}
            </select> */}
            <input
              type="text"
              placeholder="New message"
              onChange={(e) => setMessage(e.target.value)}
              className="input input-bordered w-full max-w-xs"
            />
            <div className="pt-4 mt-2 modal-action">
              <label
                htmlFor="message-add-modal"
                className="btn btn-accent"
                onClick={() => onCreate(topic, message)}
              >
                Add Message
              </label>
            </div>
          </div>
        </label>
      </label>
    </>
  );
};

export default AddMessage;
