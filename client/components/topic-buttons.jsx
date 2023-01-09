import React from "react";
import AddMessage from "./add-message-form";
import AddTopic from "./add-topic-form";
import DeleteTopic from "./delete-topic-from";

const TopicButtons = ({ topic, setTopic, topicList }) => {
  const handleCreateTopic = (topic) => {
    try {
      fetch("/api/topic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic })
      });
    } catch (err) {
      console.log("Unable to create topic");
    }
  };

  const handleDeleteTopic = (topic) => {
    try {
      fetch("/api/topic", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic })
      });
    } catch (error) {
      console.log("Unable to delete topic");
    }
  };

  //to submit message to topic
  const handleAddMessage = async (topic, message) => {
    console.log("topic: ", topic, "message: ", message);
    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic, message })
      });
      console.log("response: ", response);
      if (response.ok) {
        console.log("message added to cluster");
        return;
      } else {
        console.log("Could not add new message to the cluster");
      }
    } catch (err) {
      console.log("Network error occured");
    }
  };

  return (
    <>
      <div className="buttons-container btn-group btn-group-vertical mx-4">
        <label
          htmlFor="topic-create-modal"
          className="btn btn-xs btn-outline btn-accent"
        >
          Create topic
        </label>
        <label
          htmlFor="topic-delete-modal"
          className="btn btn-xs btn-outline btn-accent"
        >
          Delete topic
        </label>
        <label
          htmlFor="message-add-modal"
          className="btn btn-xs btn-outline btn-accent"
        >
          Write a message
        </label>
      </div>
      <AddTopic onCreate={handleCreateTopic} />
      <DeleteTopic onDelete={handleDeleteTopic} topicList={topicList} />
      <AddMessage
        onCreate={handleAddMessage}
        topic={topic}
        setTopic={setTopic}
      />
    </>
  );
};

export default TopicButtons;
