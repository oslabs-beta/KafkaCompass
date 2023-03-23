import React, { useState, useEffect, useRef } from "react";
import TopicButtons from "../components/topic-buttons";
import date from "../helper/dateFormatter";

const Messages = ({ topic, setTopic, cluster }) => {
  //state for current topic
  const [topicList, setTopicList] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [topicDeleted, setTopicDeleted] = useState(false);
  const [consumedTopic, setConsumedTopic] = useState("");
  const [spinner, setSpinner] = useState([]);
  const consumeButton = useRef();
  let messageTable = [];

  useEffect(() => {
    setMessageList([]);
    setSpinner([]);
  }, [topic]);

  // const messageTable =
  //   messageList.length === 0
  //     ? [
  //         <td key="no topic" colSpan={4} className="text-center p-4 w-4">
  //           No messages
  //         </td>
  //       ]
  //     : [];

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
    setSpinner([
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mb-5"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    ]);
    setConsumedTopic(topic);
    if (topic !== "Select a topic") {
      try {
        consumeButton.current.disabled = true;
        const response = await fetch(`/api/message/${topic}`);
        const data = await response.json();
        setSpinner([]);
        setMessageList(data);
        setTimeout(() => {
          consumeButton.current.disabled = false;
        }, 5000);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("No topic selected");
    }
  };

  //check if messageList contains messages

  messageList.sort((a, b) => b.timestamp - a.timestamp);
  messageList.forEach((el) => {
    if (!isNaN(Number(el.timestamp))) {
      el.timestamp = date.format(new Date(Number(el.timestamp)));
    }
  });
  let i = 0;

  if (consumedTopic === topic) {
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
  } else {
    messageTable.push(
      <td key="no topic" colSpan={4} className="text-center p-4 w-4">
        No messages
      </td>
    );
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
              <table className="w-full text-sm text-gray-500 rounded table-fixed">
                <thead className="bg-gray-700 text-xs text-gray-200 uppercase bg-gray-50 table-header-group sticky top-0">
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
            <div className="self-center">{spinner}</div>
            <button
              className="btn btn-active  bg-blue-800 w-min self-center"
              onClick={consumeMessages}
              ref={consumeButton}
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
