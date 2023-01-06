// const { Kafka } = require('kafkajs');
import React, { useState, useEffect } from "react";

const Messages = ({ messages }) => {
  //create new Kafka instance using kafkajs
  // const kafka = new Kafka()

  //state for current topic
  const [topicList, setTopicList] = useState([]);
  const [messageList, setMessageList] = useState([]);

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

  // console.log('topicList is :', topicList);
  const topicMenu = [];
  for (const topic of topicList) {
    topicMenu.push(
      <li>
        <a className="justify-end">{topic}</a>
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
    const response = await fetch("/api/message");
    const data = await response.json();
    console.log(data);
    setMessageList(data);
  };

  const messageTable = [];
  for (const message of messageList) {
    messageTable.push(
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4 w-4">
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
        </td>
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {message.value}
        </th>
        <td className="py-4 px-6">{message.partition}</td>
        <td className="py-4 px-6">{message.offset}</td>
        <td className="py-4 px-6">{message.timestamp}</td>
        <td className="flex items-center py-4 px-6 space-x-3">
          <a
            href="#"
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            More Details
          </a>
        </td>
      </tr>
    );
  }
  console.log("messageList is: ", messageList);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn m-1">
            Click
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-min"
          >
            {topicMenu}
          </ul>
        </div>

        <div className="overflow-y-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {/* TABLE COLUMN HEADERS */}
                <th scope="col" className="p-4">
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
                </th>
                <th scope="col" className="py-3 px-6">
                  Value
                </th>
                <th scope="col" className="py-3 px-6">
                  Partition
                </th>
                <th scope="col" className="py-3 px-6">
                  Offset
                </th>
                <th scope="col" className="py-3 px-6">
                  Timestamp
                </th>
                <th scope="col" className="py-3 px-6"></th>
              </tr>
            </thead>
            <tbody>{messageTable}</tbody>
          </table>
        </div>
      </div>
      <button
        className="btn btn-active btn-primary w-min self-center"
        onClick={consumeMessages}
      >
        Consume Messages
      </button>
    </div>
  );
};

export default Messages;
