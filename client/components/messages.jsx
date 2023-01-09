// const { Kafka } = require('kafkajs');
import React, { useState, useEffect } from "react";
import TopicButtons from "../components/topic-buttons";

const Messages = ({ topic, setTopic }) => {
  //create new Kafka instance using kafkajs
  // const kafka = new Kafka()

  //state for current topic
  // const [topic, setTopic] = useState("Select a topic");
  const [topicList, setTopicList] = useState([]);
  const [messageList, setMessageList] = useState([]);

  const messageTable =
    messageList.length === 0
      ? [
          <td colSpan={4} className="text-center p-4 w-4">
            No messages
          </td>
        ]
      : [];

  console.log("messageList initialized to: ", messageList);

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

  const selectTopic = (e) => {
    setTopic(e.target.text);
  };

  // console.log('topicList is :', topicList);
  const topicMenu = [];
  for (const topic of topicList) {
    topicMenu.push(
      <li>
        <a className="justify-end" onClick={selectTopic}>
          {topic}
        </a>
      </li>
    );
  }
  console.log("topicMenu is : ", topicMenu);

  // console.log('topic menu: ', topicMenu);

  //create click handler that consumes messages
  // const consumeMessages = () => {};

  // topicList.map((topic) => {
  //   return (
  //     <li>
  //       <a>{topic}</a>
  //     </li>
  //   );
  // })

  const consumeMessages = async () => {
    try {
      const response = await fetch(`/api/message/${topic}`);
      const data = await response.json();
      console.log(data);
      setMessageList(data);
    } catch (err) {
      console.log(err);
    }
  };

  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short"
  });

  //check if messageList contains messages

  messageList.sort((a, b) => b.timestamp - a.timestamp);

  messageList.forEach((el) => {
    el.timestamp = date.format(new Date(Number(el.timestamp)));
    // console.log(el);
  });

  for (const message of messageList) {
    messageTable.push(
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        {/* Checkbox column: might be added in a later version */}
        {/* <td className="p-4 w-4">
          <div className="flex items-center">
            <input
              id="checkbox-table-search-1"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            ></input>
            <label for="checkbox-table-search-1" className="sr-only">
              checkbox
            </label>
          </div>
        </td> */}
        <td
          scope="row"
          className="max-w-min py-4 px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white overflow-scroll"
        >
          {message.value}
        </td>
        <td className="py-4 px-6 text-center ">{message.partition}</td>
        <td className="py-4 px-6 text-center">{message.offset}</td>
        <td className="py-4 px-6 text-center">{message.timestamp}</td>
        {/* More Details column: might be implemented in a later feature */}
        {/* <td className="flex items-center py-4 px-6 text-center space-x-3">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            More Details
          </a>
        </td> */}
      </tr>
    );
  }

  console.log("messageList is: ", messageList);

  return (
    <div className="flex justify-center pt-10 items-start">
      <div className="flex justify-center flex-col" style={{ width: "73%" }}>
        <div className="flex flex-row w-full">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">
              Select Topic
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-min"
            >
              {topicMenu}
            </ul>
          </div>
          <div className="flex flex-col align-center w-full">
            <h2 className="text-center font-mono text-3xl mb-5 w-full">
              {topic !== "" && topic}
            </h2>
            <div
              style={{ maxHeight: "36rem" }}
              className="overflow-y-auto relative shadow-md sm:rounded-lg w-full mb-2"
            >
              <table className="w-full text-sm text-gray-500 rounded dark:text-gray-400 table-fixed">
                <colgroup>
                  <col span={"1"} style={{ maxWidth: "33%" }}></col>
                  <col></col>
                  <col></col>
                  <col></col>
                </colgroup>
                {/* <col className="w-" />
              <col className="w-" />
              <col className="w-" /> */}
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 table-header-group">
                  <tr>
                    {/* TABLE COLUMN HEADERS */}
                    {/* Checkbox column: might be added in a later version */}
                    {/* <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    ></input>
                    <label for="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th> */}
                    <th scope="col" className="py-3 px-6 text-center w-64">
                      Value
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Partition
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Offset
                    </th>
                    <th scope="col" className="py-3 px-6 text-center">
                      Time Sent
                    </th>
                    {/* More Details column: might be implemented in a later feature */}
                    {/* <th scope="col" className="py-3 px-6"></th> */}
                  </tr>
                </thead>
                <tbody>{messageTable}</tbody>
              </table>
            </div>
            <button
              className="btn btn-active btn-primary btn-accent w-min self-center"
              onClick={consumeMessages}
            >
              Consume Messages
            </button>
          </div>
        </div>
      </div>
      <TopicButtons topic={topic} setTopic={setTopic} topicList={topicList} />
    </div>
  );
};

export default Messages;
