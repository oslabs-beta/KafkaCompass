const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const cloudClusterSchema = new Schema({
  cluster_name: { type: String, required: true },
  API_KEY: { type: String, required: true },
  API_SECRET: { type: String, required: true },
  CLOUD_KEY: { type: String, required: true },
  CLOUD_SECRET: { type: String, required: true },
  clusterId: { type: String, required: true },
  RESTendpoint: { type: String, required: true },
  bootstrapServer: { type: String, required: true },
});

module.exports = new model('CloudCluster', cloudClusterSchema);
