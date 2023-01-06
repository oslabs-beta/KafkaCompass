const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const metricSchema = new Schema({
  clusterId: String,
  request_bytes: Object,
  response_bytes: Object,
  received_bytes: Object,
  sent_bytes: Object,
  received_records: Object,
  sent_records: Object,
  retained_bytes: Object,
  active_connection_count: Object,
  request_count: Object,
  partition_count: Object,
  successful_authentication_count: Object,
  consumer_lag_offsets: Object,
  cluster_load_percent: Object,
  created_at: { type: Date, default: Date.now() }
});

module.exports = new model("Metric", metricSchema);
