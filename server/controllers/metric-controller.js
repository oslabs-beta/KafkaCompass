const User = require("../models/user-model");
const axios = require("axios");
const parsePrometheusTextFormat = require("parse-prometheus-text-format");

const { decrypt } = require("../encryption");

const metricController = {};

metricController.fetchData = async (req, res, next) => {
  const { CLOUD_KEY, CLOUD_SECRET, clusterId } = res.locals.credentials;
  try {
    const url = `https://api.telemetry.confluent.cloud/v2/metrics/cloud/export?resource.kafka.id=${clusterId}`;
    const cloudToken = Buffer.from(
      `${CLOUD_KEY}:${CLOUD_SECRET}`,
      "utf8"
    ).toString("base64");
    const cloudHeaders = { Authorization: "Basic " + cloudToken };

    const response = await axios({
      url,
      headers: cloudHeaders
    });

    const data = parsePrometheusTextFormat(response.data);
    const metricsData = await formatMetrics(data);

    res.locals.metricsData = metricsData;
    return next();
  } catch {
    return next({
      log: "error in metricController.fetchData",
      message: "could not update metrics"
    });
  }
};

metricController.decryptKeys = (req, res, next) => {
  if (!req.session.user) {
    return next({
      log: "metricController.decrpytKeys: ERROR: Unauthorized",
      message: {
        err: "Unauthorized"
      }
    });
  }
  const { cloudCluster } = req.session.user;
  let rawCluster;
  if (!req.session.currentCluster) rawCluster = cloudCluster[0];
  else rawCluster = cloudCluster[req.session.currentCluster];

  const { CLOUD_KEY, CLOUD_SECRET, clusterId } = rawCluster;

  const credentials = { CLOUD_KEY, CLOUD_SECRET, clusterId };

  for (let key in credentials) {
    credentials[key] = decrypt(credentials[key]);
  }

  res.locals.credentials = credentials;
  res.locals.userId = req.session.user.id;
  res.locals.clusterId = rawCluster.clusterId;

  return next();
};

const formatMetrics = async (metrics) => {
  const nameMap = metrics.reduce((map, obj, i) => {
    if (!obj.name.includes("link")) map[obj.name.substring(23)] = i;
    return map;
  }, {});

  return createMetricsObject(metrics, nameMap);
};

const createMetricsObject = (dataset, nameMap) => {
  const output = {};

  const type = ["request_bytes", "response_bytes", "request_count"];
  const topic = [
    "sent_bytes",
    "received_records",
    "sent_records",
    "retained_bytes"
  ];

  for (let name in nameMap) {
    const data = dataset.at(nameMap[name]);
    if (name === "consumer_lag_offsets") {
      output[name] = mapper(data, "consumer_lag_offsets");
    } else if (type.includes(name)) {
      output[name] = mapper(data, "type");
    } else if (topic.includes(name)) {
      output[name] = mapper(data, "topic");
    } else {
      output[name] = mapper(data);
    }
  }

  return output;
};

function mapper(data, attribute) {
  const output = {};
  output.name = data.name;
  output.description = data.help;
  let totalValue = 0;
  const metrics = data.metrics.map(({ value, labels }) => {
    totalValue += Number(value);
    const consumer_lag = attribute === "consumer_lag_offsets";
    const output = consumer_lag
      ? createConsumerLagObj(value, labels)
      : createOtherObj(value, labels, attribute);
    return output;
  });
  output.totalValue = totalValue;
  output.metrics = metrics;

  return output;
}

function createOtherObj(value, labels, attribute) {
  const output = { value };
  if (attribute !== undefined) output[attribute] = labels[attribute];
  return output;
}

function createConsumerLagObj(value, labels) {
  return {
    value,
    consumer_group_id: labels.consumer_group_id,
    topic: labels.topic
  };
}

module.exports = metricController;
