// const { Kafka } = require('kafkajs');
import React, { useState, useEffect } from "react";

const Messages = ({ messages }) => {
  //create new Kafka instance using kafkajs
  // const kafka = new Kafka()

  //state for current topic
  const [topic, setTopic] = useState("Select a topic");
  const [topicList, setTopicList] = useState([]);
  const [messageList, setMessageList] = useState([]);

  const messageTable =
    messageList.length === 0
      ? [
          <td colSpan={6} className="text-center p-4 w-4">
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
        <th
          scope="row"
          className="py-4 px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {message.value}
        </th>
        <td className="py-4 px-6 text-center">{message.partition}</td>
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
    <div className="flex justify-center flex-col w-3/4">
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

        <div className="flex flex-col align-center overflow-y-auto relative shadow-md sm:rounded-lg w-full">
          <h2 className="text-center font-mono text-3xl mb-5">
            {topic !== "" && topic}
          </h2>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                <th scope="col" className="py-3 px-6 text-center">
                  Value
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  Partition
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  Offset
                </th>
                <th scope="col" className="py-3 px-6 text-center">
                  Timestamp
                </th>
                {/* More Details column: might be implemented in a later feature */}
                {/* <th scope="col" className="py-3 px-6"></th> */}
              </tr>
            </thead>
            <tbody>{messageTable}</tbody>
          </table>
          <button
            className="btn btn-active btn-primary btn-accent w-min self-center"
            onClick={consumeMessages}
          >
            Consume Messages
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
