require("dotenv").config();
const axios = require("axios");
const User = require("../models/user-model");
const CloudCluster = require("../models/cloud-cluster-model");
const { decrypt } = require("../encryption");
const { Kafka } = require("kafkajs");

const apiController = {};

apiController.getClusterInfo = async (req, res, next) => {
  if (!req.session.user)
    return next({
      log: "apiController.getClusterInfo: ERROR: Unauthorized",
      message: {
        err: "Unauthorized"
      }
    });

  try {
    const { cloudCluster } = req.session.user;
    let rawCluster;
    if (!req.session.currentCluster) rawCluster = cloudCluster[0];
    else rawCluster = cloudCluster[req.session.currentCluster];

    //creating a deep copy of the cluster in the session to avoid mutating the session cluster
    const cluster = {};
    for (const key in rawCluster) {
      cluster[key] = rawCluster[key];
    }

    for (const key in cluster) {
      if (typeof cluster[key] !== "string") continue;
      else {
        cluster[key] = decrypt(cluster[key]);
      }
    }
    res.locals.cluster = cluster;
    next();
  } catch {
    next({ log: "error in getClusterInfo" });
  }
};

apiController.getClusterList = (req, res, next) => {
  if (!req.session.user)
    return next({
      log: "apiController.getClusterList: ERROR: Unauthorized",
      message: {
        err: "Unauthorized"
      }
    });

  const { cloudCluster } = req.session.user;

  try {
    const clusterList = [];
    for (let i = 0; i < cloudCluster.length; i++) {
      clusterList.push(decrypt(cloudCluster[i].clusterId));
    }
    res.locals.clusterList = clusterList;
    next();
  } catch (err) {
    next({
      log: "apiController.getClusterList: ERROR: Could not create clusterList",
      message: { error: err } //"Could not create cluster list" }
    });
  }
};

apiController.getTopics = async (req, res, next) => {
  const { cluster } = res.locals;
  const { RESTendpoint, clusterId, API_KEY, API_SECRET } = cluster;
  const token = Buffer.from(`${API_KEY}:${API_SECRET}`, "utf8").toString(
    "base64"
  );
  const headers = { Authorization: "Basic " + token };

  try {
    const response = await axios({
      url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}/topics`,
      headers
    });
    // this will access the array of topics, feel free to read just the response to see all available keys
    const data = response.data.data;
    const topicList = [];
    data.forEach((el) => topicList.push(el.topic_name));
    res.locals.topicList = topicList;
    next();
  } catch (err) {
    next({ log: "error in getTopics" });
  }
};

// this API call will create new topic in your cluster
// it will also add default number of partitions to the topic - 6
// use cluster headers here
apiController.addTopic = async (req, res, next) => {
  const { cluster } = res.locals;
  const { RESTendpoint, clusterId, API_KEY, API_SECRET } = cluster;
  const token = Buffer.from(`${API_KEY}:${API_SECRET}`, "utf8").toString(
    "base64"
  );
  const headers = { Authorization: "Basic " + token };

  const { topic } = req.body;
  //format topic to remove any spaces in the name with an underscore
  const formattedTopic = topic.replace(/ /g, "_");

  try {
    const response = axios({
      method: "post",
      url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}/topics`,
      data: {
        topic_name: `${formattedTopic}`
      },
      headers
    });
    const data = await response;
    // console.log(data);
    next();
  } catch (err) {
    next({
      log: "error in addTopic",
      message: "could not add topic to cluster"
    });
  }
};

apiController.deleteTopic = async (req, res, next) => {
  const { cluster } = res.locals;
  const { RESTendpoint, clusterId, API_KEY, API_SECRET } = cluster;
  const token = Buffer.from(`${API_KEY}:${API_SECRET}`, "utf8").toString(
    "base64"
  );
  const headers = { Authorization: "Basic " + token };

  // name for the new topic
  const { topic } = req.body;

  try {
    const response = await axios({
      method: "delete",
      url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}/topics/${topic}`,
      headers
    });
    next();
  } catch (err) {
    next({
      log: "error in deleteTopic",
      message: "could not delete topic in cluster"
    });
  }
};

apiController.getMessages = async (req, res, next) => {
  //general plan for this one would be to make our own consumer which would just give the latest stream of messages from the cluster
  //thinking we could use kafka.js for
  try {
    const { topic } = req.params;
    const { cluster } = res.locals;
    const { API_KEY, API_SECRET, clusterId, bootstrapServer } = cluster;
    const kafka = new Kafka({
      brokers: [bootstrapServer],
      clientId: clusterId,
      ssl: true,
      sasl: {
        mechanism: "plain",
        password: API_SECRET,
        username: API_KEY
      }
    });
    const groupId = "kafka-group";
    const consumer = kafka.consumer({ groupId });
    const admin = kafka.admin();

    const receiveMessages = async () => {
      await admin.connect();
      await admin.resetOffsets({ groupId, topic });
      await admin.disconnect();
      await consumer.connect();
      await consumer.subscribe({ topic: topic, fromBeginning: true });
      res.locals.messageList = [];
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const kafkaMessage = {
            topic,
            partition,
            timestamp: message.timestamp,
            offset: message.offset,
            value: message.value.toString()
          };
          console.log("Received message:", kafkaMessage);
          res.locals.messageList.push(kafkaMessage);
        }
      });
      setTimeout(() => {
        consumer.disconnect();
        next();
      }, 2000);
    };
    receiveMessages();
  } catch (err) {
    next({
      log: "error in getMessages",
      message: "Could not get messages from cluster"
    });
  }
};

apiController.addMessage = async (req, res, next) => {
  const { cluster } = res.locals;
  const { RESTendpoint, clusterId, API_KEY, API_SECRET } = cluster;
  const token = Buffer.from(`${API_KEY}:${API_SECRET}`, "utf8").toString(
    "base64"
  );
  const headers = { Authorization: "Basic " + token };

  const { topic, message } = req.body;

  try {
    const response = await axios({
      method: "post",
      url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}/topics/${topic}/records`,
      data: { partition_id: null, value: { type: "JSON", data: `${message}` } },
      headers
    });
    const data = response.data;
    console.log("data in addMessage: ", data);
    next();
  } catch (err) {
    next({
      log: "error in addMessage",
      message: "could not add message to cluster"
    });
  }
};

module.exports = apiController;
