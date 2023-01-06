require("dotenv").config();
const axios = require("axios");

// we use it to parse prometheus to java script object
const parsePrometheusTextFormat = require("parse-prometheus-text-format");

// cluster key and secret
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

// cloud key and secret
const CLOUD_KEY = process.env.CLOUD_KEY;
const CLOUD_SECRET = process.env.CLOUD_SECRET;

// both - cloud and cluster key - can be found in your confluent account
// find API keys in the left list of options in your dashboard (create new one with global access)
// find cloud API keys in the right list of options (under billing)
// if any access errors occures, check your accounts & access settings. Try to grant roles with more rights to your account

// get this in your cloud account
// OR by typing in CLI 'confluent kafka cluster decribe' OR './bin/confluent kafka cluster describe'
const clusterId = process.env.CLUSTER;

// get this in your cloud account
// OR by typing in CLI 'confluent kafka cluster decribe' OR './bin/confluent kafka cluster describe'
const RESTendpoint = process.env.REST;

// to send your key and secret you need to encode it first
// then set your authorization header with the encoded credentials
const token = Buffer.from(`${API_KEY}:${API_SECRET}`, "utf8").toString(
  "base64"
);
const headers = { Authorization: "Basic " + token };

// same process but for cloud credentials
const cloudToken = Buffer.from(`${CLOUD_KEY}:${CLOUD_SECRET}`, "utf8").toString(
  "base64"
);
const cloudHeaders = { Authorization: "Basic " + cloudToken };

// basic API endpoint for getting metrics list
// we use cloudHeaders here
// you can get number of partitions and bytes per topic among the other things
// (confluent_kafka_server_response_bytes, confluent_kafka_server_active_connection_count, confluent_kafka_server_request_count, etc)
const getMetricsList = async () => {
  const response = await axios({
    url: `https://api.telemetry.confluent.cloud/v2/metrics/cloud/export?resource.kafka.id=${clusterId}`,
    headers: cloudHeaders
  });
  const data = response.data;
  console.log(parsePrometheusTextFormat(data));
  parsePrometheusTextFormat(data).forEach((obj) => {
    if (obj.name === "confluent_kafka_server_request_count") {
      console.log(obj.metrics);
    }
  });
};

getMetricsList();

// Returns a list of configuration parameters for the specified Kafka cluster.
// It's basically list of endpoints to check for specific things in your cluster
// use cluster headers here
const getClusterConfigs = async () => {
  const response = await axios({
    url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}`,
    headers
  });
  const data = response.data;
  console.log(data);
};

// getClusterConfigs();

// Returns list of topic objects in the cluster with information on replication factor, partitions and names of the topics
// Within each topic you can also find API endpoint to this particular topic and its configuration
// use cluster headers here
const getListOfTopics = async () => {
  const response = await axios({
    url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}/topics`,
    headers
  });
  // this will access the array of topics, feel free to read just the response to see all available keys
  const data = response.data.data;
  console.log(data);
};

// getListOfTopics();

// Returns a list of configuration parameters for the specified Kafka cluster.
// I don't know, the data array is empty in my case
// use cluster headers here
const getBrokers = async () => {
  const response = await axios({
    url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}/broker-configs`,
    headers
  });
  const data = response.data;
  console.log(data);
};

// getBrokers();

// this API call will create new topic in your cluster
// it will also add default number of partitions to the topic - 6
// use cluster headers here
const createTopic = async () => {
  // name for the new topic
  const new_topic = "songs";

  const response = axios({
    method: "post",
    url: `https://pkc-lzvrd.us-west4.gcp.confluent.cloud:443/kafka/v3/clusters/lkc-j33yz8/topics`,
    data: {
      topic_name: `${new_topic}`
    },
    headers
  });
  const data = await response;
  console.log(data);
};

// createTopic();

// this API call will delete specified topic in the cluster
// use cluster headers here
const deleteTopic = async () => {
  const topic_name = "songs";

  const response = await axios({
    method: "delete",
    url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}/topics/${topic_name}`,
    headers
  });

  const data = response.data;
  console.log(data);
};

// deleteTopic();

// This API call will produce records to the specified topic
// use cluster headers
// to produce several messages with one call
const produceRecords = async () => {
  const topic_name = "songs";
  const response = await axios({
    method: "post",
    url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}/topics/${topic_name}/records`,
    data: {
      partition_id: "1",
      value: { type: "JSON", data: "Another one (bites the dust)" }
    },
    headers
  });
  const data = response.data;
  console.log(data);
};

// produceRecords();

// gets the list of partitions for specific topic
// use cluster header
const listOfPartitions = async () => {
  const topic_name = "poems";
  const response = await axios({
    url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}/topics/${topic_name}/partitions`,
    headers
  });
  const data = response.data;
  console.log(data);
};

// listOfPartitions();

// get one specific partition
const getPartition = async () => {
  const topic_name = "poems";
  const partition_id = 1;
  const response = await axios({
    url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}/topics/${topic_name}/partitions/${partition_id}`,
    headers
  });
  const data = response.data;
  console.log(data);
};

// getPartition();
