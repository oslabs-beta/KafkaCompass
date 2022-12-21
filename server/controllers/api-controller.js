require('dotenv').config();
const axios = require('axios');

// cluster key and secret
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

// cloud key and secret
const CLOUD_KEY = process.env.CLOUD_KEY;
const CLOUD_SECRET = process.env.CLOUD_SECRET;

// get this in your cloud account 
// OR by typing in CLI 'confluent kafka cluster decribe' OR './bin/confluent kafka cluster describe'
const clusterId = process.env.CLUSTER;
// get this in your cloud account 
// OR by typing in CLI 'confluent kafka cluster decribe' OR './bin/confluent kafka cluster describe'
const RESTendpoint = process.env.REST;

const token = Buffer.from(`${API_KEY}:${API_SECRET}`, 'utf8').toString('base64');
const headers = { 'Authorization': 'Basic '+ token };

// same process but for cloud credentials
const cloudToken = Buffer.from(`${CLOUD_KEY}:${CLOUD_SECRET}`, 'utf8').toString('base64');
const cloudHeaders = {'Authorization': 'Basic '+ cloudToken };

const apiController = {};

apiController.getTopics = async(req, res, next) => {
    try {
        const response = await axios({
            url: `${RESTendpoint}/kafka/v3/clusters/${clusterId}/topics`,
            headers
        });
        // this will access the array of topics, feel free to read just the response to see all available keys
        const data = response.data.data;
        console.log('data from getTopics: ', data);
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
    
    const { cluster_id } = req.params;
    const { topic } = req.body;
    console.log('in add Topic')
    try {
        const response = axios({
           method: 'post',
           url: `${RESTendpoint}/kafka/v3/clusters/${cluster_id}/topics`,
           data: {
            "topic_name": `${topic}`
           },
           headers
        });
        const data = await response;
        console.log(data);
        next();
    } catch(err) {
        next({log: 'error in addTopic', message: 'could not add topic to cluster'})
    }
}

apiController.deleteTopic = async(req, res, next) => {
    const { cluster_id } = req.params;
    const { topic } = req.body;
    
    // name for the new topic
    const new_topic = 'songs';

    const response = axios({
       method: 'post',
       url: `https://pkc-lzvrd.us-west4.gcp.confluent.cloud:443/kafka/v3/clusters/lkc-j33yz8/topics`,
       data: {
        "topic_name": `${new_topic}`
       },
       headers
    });
    const data = await response;
    console.log(data);
}

module.exports = apiController;