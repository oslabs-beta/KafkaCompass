const User = require('../models/user-model');
const CloudCluster = require('../models/cloud-cluster-model');
const { Session } = require('express-session');
const bcrypt = require('bcrypt');

const userController = {};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;

  if (username === undefined || password === undefined) {
    return next({
      log: 'userController.verifyUser: ERROR: Missing info',
      message: {
        err: 'missing info',
      },
    });
  }

  try {
    const user = await User.findOne({ username }).populate('cloudCluster');

    //Using bcrypt to compare password with its hashed version
    if (!(await bcrypt.compare(password, user.password))) throw new Error();

    res.locals.user = user;
    return next();
  } catch (error) {
    return next({
      log: 'userController.verifyUser: ERROR: wrong info',
      message: {
        err: 'wrong info',
      },
    });
  }
};

userController.createUser = async (req, res, next) => {
  const { email, username, password, firstName, lastName } = req.body;

  const credentials = { email, username, password };

  if (Object.keys(credentials).some((key) => credentials[key] === undefined)) {
    return next({
      log: 'userController.createUser: ERROR: Missing essential info',
      message: {
        err: 'missing essential info',
      },
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
    return next(error);
  }
};

userController.logOut = (req, res, next) => {
  req.session.destroy();
  return next();
}

userController.authorizeUser = (req, res, next) => {
  if (res.locals.user) req.session.user = res.locals.user;
  req.session.authorized = true;
  req.session.save();
  return next();
};

userController.addCloudCluster = async (req, res, next) => {
  if (!req.session.user)
    return next({
      log: 'userController.addCloudCluster: ERROR: Unauthorized',
      message: {
        err: 'Unauthorized',
      },
    });

  const { _id } = req.session.user;

  const {
    API_KEY,
    API_SECRET,
    CLOUD_KEY,
    CLOUD_SECRET,
    clusterId,
    RESTendpoint,
  } = req.body;

  let user;

  try {
    user = await User.findById(_id);
  } catch (error) {
    return next({
      log: 'userController.addCloudCluster: ERROR: unknown user',
      message: {
        err: 'unknown user',
      },
    });
  }

  const clusterInfo = {
    API_KEY,
    API_SECRET,
    CLOUD_KEY,
    CLOUD_SECRET,
    clusterId,
    RESTendpoint,
  };

  console.log(clusterInfo);

  try {
    const cluster = await CloudCluster.create(clusterInfo);
    console.log(cluster);
    console.log(user);
    user.cloudCluster.push(cluster);
    user.save();
  } catch (error) {
    return next({
      log: 'userController.addCloudCluster: ERROR: failed to create cluster',
      message: {
        err: 'failed to create cluster',
      },
    });
  }

  return next();
};

userController.addMetrics = async (req, res, next) => {
  if (!req.session.user)
    return next({
      log: 'userController.addCloudCluster: ERROR: Unauthorized',
      message: {
        err: 'Unauthorized',
      },
    });

  const { _id } = req.session.user;

  const {
    API_KEY,
    API_SECRET,
    CLOUD_KEY,
    CLOUD_SECRET,
    clusterId,
    RESTendpoint,
  } = req.body;

  let user;

  try {
    user = await User.findById(_id);
  } catch (error) {
    return next({
      log: 'userController.addCloudCluster: ERROR: unknown user',
      message: {
        err: 'unknown user',
      },
    });
  }

  const clusterInfo = {
    API_KEY,
    API_SECRET,
    CLOUD_KEY,
    CLOUD_SECRET,
    clusterId,
    RESTendpoint,
  };

  console.log(clusterInfo);

  try {
    const cluster = await CloudCluster.create(clusterInfo);
    console.log(cluster);
    console.log(user);
    user.cloudCluster.push(cluster);
    user.save();
  } catch (error) {
    return next({
      log: 'userController.addCloudCluster: ERROR: failed to create cluster',
      message: {
        err: 'failed to create cluster',
      },
    });
  }

  return next();
};

userController.addMetrics = (req, res, next) => {
  return next();
}

module.exports = userController;
