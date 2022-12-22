require('dotenv').config();
const axios = require('axios');
const User = require('../models/user-model');
const CloudCluster = require('../models/cloud-cluster-model');

const apiController = {};

apiController.getClusterInfo = async(req, res, next) => {
    if (!req.session.user)
    return next({
      log: 'apiController.getClusterInfo: ERROR: Unauthorized',
      message: {
        err: 'Unauthorized',
      },
    });

    try {
      const { cloudCluster } = req.session.user;
      res.locals.cluster = cloudCluster[0];
      next();
    }
    catch {
      next({log: 'error in getClusterInfo'})
    }
}

apiController.getTopics = async(req, res, next) => {
    const { cluster } = res.locals;
    const { RESTendpoint, clusterId, API_KEY, API_SECRET } = cluster;
    const token = Buffer.from(`${API_KEY}:${API_SECRET}`, 'utf8').toString('base64');
    const headers = { 'Authorization': 'Basic '+ token };

    try {
        const response = await axios({
            url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}/topics`,
            headers
        });
        // this will access the array of topics, feel free to read just the response to see all available keys
        const data = response.data.data;
        // console.log('data from getTopics: ', data);
        let topicList = [];
        data.forEach((el) => topicList.push(el.topic_name));
        res.locals.topicList = topicList;
        next();
    }
    catch(err) {
        next({log: 'error in getTopics'})
    }
}

// this API call will create new topic in your cluster
// it will also add default number of partitions to the topic - 6
// use cluster headers here
apiController.addTopic = async(req, res, next) => {
    const { cluster } = res.locals;
    const { RESTendpoint, clusterId, API_KEY, API_SECRET } = cluster;
    const token = Buffer.from(`${API_KEY}:${API_SECRET}`, 'utf8').toString('base64');
    const headers = { 'Authorization': 'Basic '+ token };

    const { topic } = req.body;

    try {
        const response = axios({
           method: 'post',
           url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}/topics`,
           data: {
            "topic_name": `${topic}`
           },
           headers
        });
        const data = await response;
        // console.log(data);
        next();
    } catch(err) {
        next({log: 'error in addTopic', message: 'could not add topic to cluster'})
    }
}

apiController.deleteTopic = async(req, res, next) => {
    const { cluster } = res.locals;
    const { RESTendpoint, clusterId, API_KEY, API_SECRET } = cluster;
    const token = Buffer.from(`${API_KEY}:${API_SECRET}`, 'utf8').toString('base64');
    const headers = { 'Authorization': 'Basic '+ token };

    // name for the new topic
    const { topic } = req.body;
    try {
        const response = axios({
           method: 'delete',
           url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}/topics/${topic}`,
           headers
        });
        const data = await response;
        // console.log(data);
        next();
    } catch(err) {
        next({log: 'error in deleteTopic', message: 'could not delete topic in cluster'})
    }
}

apiController.getMessages = async(req, res, next) => {
    //general plan for this one would be to make our own consumer which would just give the latest stream of messages from the cluster
    //thinking we could use kafka.js for this
}

apiController.addMessage = async(req, res, next) => {
    const { cluster } = res.locals;
    const { RESTendpoint, clusterId, API_KEY, API_SECRET } = cluster;
    const token = Buffer.from(`${API_KEY}:${API_SECRET}`, 'utf8').toString('base64');
    const headers = { 'Authorization': 'Basic '+ token };

    const { topic, message } = req.body;

    try {
        const response = await axios({
            method: 'post',
            url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}/topics/${topic}/records`,
            data: {partition_id: null, value: {type: "JSON", data: `${message}`}},
            headers
        });
        const data = response.data;
        console.log('data in addMessage: ', data);
        next();
    }
    catch (err) {
        next({log: 'error in addMessage', message: 'could not add message to cluster'})
    }
}

module.exports = apiController;