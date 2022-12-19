const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  cloudCluster: [
    {
      type: Schema.Types.ObjectId,
      ref: 'CloudCluster',
    },
  ],
});

module.exports = new model('User', userSchema);
