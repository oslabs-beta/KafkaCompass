import React, { useState, useEffect } from "react";
import TopicButtons from "../components/topic-buttons";

const Messages = ({ topic, setTopic, cluster }) => {
  //state for current topic
  const [topicList, setTopicList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [topicDeleted, setTopicDeleted] = useState(false);

  useEffect(() => {
    setMessageList([]);
  }, [topic]);

  const messageTable =
    messageList.length === 0
      ? [
          <td key="no topic" colSpan={4} className="text-center p-4 w-4">
            No messages
          </td>
        ]
      : [];

  // sets list of topics in the state depending on the data in the user's current cluster
  useEffect(() => {
    async function getTopicList() {
      try {
        const response = await fetch("/api/topic");
        const data = await response.json();
        if (response.ok) {
          setTopicList(data);
        } else {
          console.log("Could not get topics.");
        }
      } catch {
        console.log("Network error fetching topic list");
      }
    }
    getTopicList();
  }, [cluster, topicDeleted]);

  const selectTopic = (e) => {
    setTopic(e.target.text);
  };

  const topicMenu = [];
  if (topicList.length) {
    for (const topic of topicList) {
      topicMenu.push(
        <li key={topic}>
          <a className="justify-end" onClick={selectTopic}>
            {topic}
          </a>
        </li>
      );
    }
  }

  const consumeMessages = async () => {
    if (topic !== "Select a topic") {
      try {
        const response = await fetch(`/api/message/${topic}`);
        const data = await response.json();
        setMessageList(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No topic selected");
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
    if (!isNaN(Number(el.timestamp))) {
      el.timestamp = date.format(new Date(Number(el.timestamp)));
    }
  });
  let i = 0;
  for (const message of messageList) {
    messageTable.push(
      <tr
        key={message.value + i}
        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
      >
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
      </tr>
    );
    i++;
  }

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
                  </tr>
                </thead>
                <tbody>{messageTable}</tbody>
              </table>
            </div>
            <button
              className="btn btn-active  bg-blue-800 w-min self-center"
              onClick={consumeMessages}
            >
              Consume Messages
            </button>
          </div>
        </div>
      </div>
      <TopicButtons
        topic={topic}
        setTopic={setTopic}
        topicList={topicList}
        setTopicList={setTopicList}
        topicDeleted={topicDeleted}
        setTopicDeleted={setTopicDeleted}
      />
    </div>
  );
};

export default Messages;
