import React from "react";
import AddMessage from "./add-message-form";
import AddTopic from "./add-topic-form";
import DeleteTopic from "./delete-topic-from";

const TopicButtons = ({
  chartData,
  setChart,
  total,
  setTotal,
  topic,
  setTopic
}) => {
  const handleCreateTopic = async (topic) => {
    try {
      const response = await fetch("/api/topic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic })
      });
      if (response.ok) {
        const newChartData = chartData;
        newChartData.topics.labels.push(topic);
        newChartData.topics.datasets[0].data.push(0);
        setChart(newChartData);
        return;
      } else {
        console.log("Could not add new topic to the cluster");
      }
    } catch (err) {
      console.log("Network error occurred");
    }
  };

  const handleDeleteTopic = async (topic) => {
    await fetch("/api/topic", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ topic })
    });
    const newChartData = chartData;
    console.log(newChartData);
    const i = newChartData.topics.labels.findIndex((el) => el === topic);
    newChartData.topics.labels.splice(i, 1);
    newChartData.topics.datasets[0].data.splice(i, 1);
    const totalBytes = newChartData.topics.datasets[0].data.reduce(
      (a, b) => a + b
    );
    setChart(newChartData);
    setTotal(totalBytes);
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
      <DeleteTopic onDelete={handleDeleteTopic} chartData={chartData} />
      <AddMessage
        onCreate={handleAddMessage}
        topic={topic}
        setTopic={setTopic}
      />
    </>
  );
};

export default TopicButtons;
