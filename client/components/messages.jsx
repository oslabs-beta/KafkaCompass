import React, { useState, useEffect } from 'react';
// const { Kafka } = require('kafkajs');

const Messages = ({ messages }) => {
  //create new Kafka instance using kafkajs
  // const kafka = new Kafka()

  //state for current topic
  const [topicList, setTopicList] = useState('');

  useEffect(() => {
    fetch('/api/topic')
      .then((res) => res.json())
      .then((data) => {
        console.log('data is :', data);
        setTopicList(data);
      })
      .catch(() => {
        console.log('ERROR');
      });
  }, []);

  // console.log('topicList is :', topicList);
  const topicMenu = [];
  for (const topic of topicList) {
    topicMenu.push(
      <li>
        <a className='justify-end'>{topic}</a>
      </li>
    );
  }
  console.log('topicMenu is : ', topicMenu);

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

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row'>
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn m-1'>
            Click
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-min'
          >
            {topicMenu}
          </ul>
        </div>

        <div className='overflow-y-auto relative shadow-md sm:rounded-lg'>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                {/* TABLE COLUMN HEADERS */}
                <th scope='col' className='p-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-all-search'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    ></input>
                    <label for='checkbox-all-search' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope='col' className='py-3 px-6'>
                  Value
                </th>
                <th scope='col' className='py-3 px-6'>
                  Partition
                </th>
                <th scope='col' className='py-3 px-6'>
                  Offset
                </th>
                <th scope='col' className='py-3 px-6'>
                  Timestamp
                </th>
                <th scope='col' className='py-3 px-6'></th>
              </tr>
            </thead>
            <tbody>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='p-4 w-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-search-1'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    ></input>
                    <label for='checkbox-table-search-1' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope='row'
                  className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  Apple MacBook Pro 17"
                </th>
                <td className='py-4 px-6'>Sliver</td>
                <td className='py-4 px-6'>Laptop</td>
                <td className='py-4 px-6'>Yes</td>
                <td className='flex items-center py-4 px-6 space-x-3'>
                  <a
                    href='#'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='p-4 w-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-search-2'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    ></input>
                    <label for='checkbox-table-search-2' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope='row'
                  className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  Microsoft Surface Pro
                </th>
                <td className='py-4 px-6'>White</td>
                <td className='py-4 px-6'>Laptop PC</td>
                <td className='py-4 px-6'>No</td>
                <td className='flex items-center py-4 px-6 space-x-3'>
                  <a
                    href='#'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='p-4 w-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-search-3'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    ></input>
                    <label for='checkbox-table-search-3' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope='row'
                  className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  Magic Mouse 2
                </th>
                <td className='py-4 px-6'>Black</td>
                <td className='py-4 px-6'>Accessories</td>
                <td className='py-4 px-6'>Yes</td>
                <td className='flex items-center py-4 px-6 space-x-3'>
                  <a
                    href='#'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='p-4 w-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-search-3'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    ></input>
                    <label for='checkbox-table-search-3' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope='row'
                  className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  Apple Watch
                </th>
                <td className='py-4 px-6'>Black</td>
                <td className='py-4 px-6'>Watches</td>
                <td className='py-4 px-6'>Yes</td>
                <td className='flex items-center py-4 px-6 space-x-3'>
                  <a
                    href='#'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='p-4 w-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-search-3'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    ></input>
                    <label for='checkbox-table-search-3' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope='row'
                  className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  Apple iMac
                </th>
                <td className='py-4 px-6'>Silver</td>
                <td className='py-4 px-6'>PC</td>
                <td className='py-4 px-6'>Yes</td>
                <td className='flex items-center py-4 px-6 space-x-3'>
                  <a
                    href='#'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='p-4 w-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-search-3'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    ></input>
                    <label for='checkbox-table-search-3' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope='row'
                  className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  Apple AirPods
                </th>
                <td className='py-4 px-6'>White</td>
                <td className='py-4 px-6'>Accessories</td>
                <td className='py-4 px-6'>No</td>
                <td className='flex items-center py-4 px-6 space-x-3'>
                  <a
                    href='#'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='p-4 w-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-search-3'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    ></input>
                    <label for='checkbox-table-search-3' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope='row'
                  className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  iPad Pro
                </th>
                <td className='py-4 px-6'>Gold</td>
                <td className='py-4 px-6'>Tablet</td>
                <td className='py-4 px-6'>No</td>
                <td className='flex items-center py-4 px-6 space-x-3'>
                  <a
                    href='#'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='p-4 w-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-search-3'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    ></input>
                    <label for='checkbox-table-search-3' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope='row'
                  className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  Magic Keyboard
                </th>
                <td className='py-4 px-6'>Black</td>
                <td className='py-4 px-6'>Accessories</td>
                <td className='py-4 px-6'>Yes</td>
                <td className='flex items-center py-4 px-6 space-x-3'>
                  <a
                    href='#'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='p-4 w-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-search-3'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    ></input>
                    <label for='checkbox-table-search-3' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope='row'
                  className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  Apple TV 4K
                </th>
                <td className='py-4 px-6'>Black</td>
                <td className='py-4 px-6'>TV</td>
                <td className='py-4 px-6'>Yes</td>
                <td className='flex items-center py-4 px-6 space-x-3'>
                  <a
                    href='#'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </a>
                </td>
              </tr>
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td className='p-4 w-4'>
                  <div className='flex items-center'>
                    <input
                      id='checkbox-table-search-3'
                      type='checkbox'
                      className='w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                    ></input>
                    <label for='checkbox-table-search-3' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope='row'
                  className='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  AirTag
                </th>
                <td className='py-4 px-6'>Silver</td>
                <td className='py-4 px-6'>Accessories</td>
                <td className='py-4 px-6'>Yes</td>
                <td className='flex items-center py-4 px-6 space-x-3'>
                  <a
                    href='#'
                    className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button
        className='btn btn-active btn-primary w-min'
        onClick={consumeMessages}
      >
        Consume Messages
      </button>
    </div>
  );
};

export default Messages;
