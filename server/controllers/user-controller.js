const User = require("../models/user-model");
const CloudCluster = require("../models/cloud-cluster-model");
const Metric = require("../models/metric-model");
const { Session } = require("express-session");
const bcrypt = require("bcrypt");
const { decrypt } = require("../encryption");

const userController = {};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined) {
    return next({
      log: "userController.verifyUser: ERROR: Missing info",
      message: {
        err: "missing info"
      }
    });
  }

  try {
    const user = await User.findOne({ username })
      .populate("cloudCluster")
      .populate("metric");

    //Using bcrypt to compare password with its hashed version
    if (!(await bcrypt.compare(password, user.password))) throw new Error();

    res.locals.user = user;
    return next();
  } catch (error) {
    return next({
      log: "userController.verifyUser: ERROR: wrong info",
      message: {
        err: "wrong info"
      }
    });
  }
};

userController.createUser = async (req, res, next) => {
  const { email, username, password, firstName, lastName } = req.body;

  const credentials = { email, username, password };

  if (Object.keys(credentials).some((key) => credentials[key] === undefined)) {
    return next({
      log: "userController.createUser: ERROR: Missing essential info",
      message: {
        err: "missing essential info"
      }
    });
  }

  credentials.firstName = firstName;
  credentials.lastName = lastName;

  try {
    //Using bcrypt to hash password
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    credentials.password = hashedPassword;
    const user = await User.create(credentials);
    res.locals.user = user;
    return next();
  } catch (error) {
    return next({ log: "error in userController.createrUser" });
  }
};

userController.logOut = (req, res, next) => {
  req.session.destroy();
  return next();
};

userController.authorizeUser = (req, res, next) => {
  if (res.locals.user) req.session.user = res.locals.user;
  req.session.authorized = true;
  req.session.save();
  return next();
};

userController.addCloudCluster = async (req, res, next) => {
  console.log("user is: ", req.session.user);
  if (!req.session.user)
    return next({
      log: "userController.addCloudCluster: ERROR: Unauthorized",
      message: {
        err: "Unauthorized"
      }
    });

  const { _id } = req.session.user;

  const {
    API_KEY,
    API_SECRET,
    CLOUD_KEY,
    CLOUD_SECRET,
    clusterId,
    RESTendpoint,
    bootstrapServer,
    cluster_name
  } = res.locals.credentials;

  let user;

  try {
    user = await User.findById(_id);
  } catch (error) {
    return next({
      log: "userController.addCloudCluster: ERROR: unknown user",
      message: {
        err: "unknown user"
      }
    });
  }

  const clusterInfo = {
    API_KEY,
    API_SECRET,
    CLOUD_KEY,
    CLOUD_SECRET,
    clusterId,
    RESTendpoint,
    bootstrapServer,
    cluster_name
  };

  try {
    const cluster = await CloudCluster.create(clusterInfo);

    user.cloudCluster.push(cluster);
    user.save();
  } catch (error) {
    return next({
      log: "userController.addCloudCluster: ERROR: failed to create cluster",
      message: {
        err: "failed to create cluster"
      }
    });
  }

  return next();
};

userController.addMetrics = async (req, res, next) => {
  if (!req.session.user)
    return next({
      log: "userController.addCloudCluster: ERROR: Unauthorized",
      message: {
        err: "Unauthorized"
      }
    });

  const { _id } = req.session.user;

  const {
    API_KEY,
    API_SECRET,
    CLOUD_KEY,
    CLOUD_SECRET,
    clusterId,
    RESTendpoint,
    cluster_name
  } = req.body;

  let user;

  try {
    user = await User.findById(_id);
  } catch (error) {
    return next({
      log: "userController.addCloudCluster: ERROR: unknown user",
      message: {
        err: "unknown user"
      }
    });
  }

  const clusterInfo = {
    API_KEY,
    API_SECRET,
    CLOUD_KEY,
    CLOUD_SECRET,
    clusterId,
    RESTendpoint,
    cluster_name
  };

  try {
    const cluster = await CloudCluster.create(clusterInfo);

    user.cloudCluster.push(cluster);
    user.save();
  } catch (error) {
    return next({
      log: "userController.addCloudCluster: ERROR: failed to create cluster",
      message: {
        err: "failed to create cluster"
      }
    });
  }

  return next();
};

userController.addMetrics = async (req, res, next) => {
  const clusterId = decrypt(res.locals.clusterId);
  const user = await User.findById(req.session.user._id);
  const metricsData = res.locals.metricsData;
  metricsData.clusterId = clusterId;
  try {
    const metric = await Metric.create(metricsData);
    user.metric.push(metric);
    user.save();
    res.locals.metric = metric;
  } catch (error) {
    return next({
      log: "userController.addMetric: ERROR: failed to create metric",
      message: {
        err: "failed to create metric"
      }
    });
  }
  return next();
};

module.exports = userController;
