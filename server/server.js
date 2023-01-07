const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const path = require("path");
const PORT = 3000;

const mongodb = require("mongoose");
const MONGO_URI = require("./credentials");

const cloudAuthController = require("./controllers/cloud-auth-controller");
const userController = require("./controllers/user-controller");
const apiController = require("./controllers/api-controller");
const metricController = require("./controllers/metric-controller");

const app = express();

mongodb.connect(MONGO_URI);
// to parse incoming json objects and cookies
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, "../dist")));

const min = 60 * 1000;
const hour = 60 * min;
app.use(
  session({
    secret: "test",
    saveUninitialized: true,
    cookie: { maxAge: 50000000 },
    resave: false
  })
);

app.use(
  "/api/login",
  userController.verifyUser,
  userController.setUserAuth,
  (req, res, next) => {
    res.status(200).json(res.locals.user);
  }
);

app.get("/api/authenticate", userController.checkUserAuth, (req, res, next) => {
  res.status(200).json(req.session.user);
});

app.get("/api/logout", userController.logOut, (req, res, next) => {
  console.log("user logged out");
  res.status(200).json();
});

// testing endpoint for sign up
app.use(
  "/api/signup",
  userController.createUser,
  userController.setUserAuth,
  (req, res, next) => {
    res.status(200).json(res.locals.user);
  }
);

// app.get('/', (req, res) => {
//   console.log('WE ARE HERE');
//   res.sendFile(path.resolve(__dirname, '../dist/index.html'));
// });
//requests to server go here
app.post(
  "/api/cloud-auth",
  userController.checkUserAuth,
  cloudAuthController.encryptCredentials,
  userController.addCloudCluster,
  (req, res) => {
    return res.json(res.locals.credentials);
  }
);

//endpoint to switch current cluster in session
app.get("/api/getClusterList", userController.checkUserAuth, apiController.getClusterList, (req, res) => {
  return res.status(201).json(res.locals.clusterList);
});

app.post("/api/switchCluster", userController.checkUserAuth, userController.switchCluster, (req, res) => {
  return res.status(201).json("cluster switched");
});

//endpoints to get and modify various elements of the cluster

//message-related endpoints
//get all messages in a topic
app.get(
  "/api/message",
  userController.checkUserAuth,
  apiController.getClusterInfo,
  apiController.getMessages,
  async (req, res) => {
    console.log("HERE");
    console.log("message list from res: ", res.locals.messageList);
    return res.status(200).json(res.locals.messageList);
  }
);
//add a message to a topic
app.post(
  "/api/message",
  userController.checkUserAuth,
  apiController.getClusterInfo,
  apiController.addMessage,
  (req, res) => {
    return res.status(201).json("message added");
  }
);

//topic-related endpoints
//get all topics in a cluster
app.get(
  "/api/topic",
  userController.checkUserAuth,
  apiController.getClusterInfo,
  apiController.getTopics,
  (req, res) => {
    return res.status(200).json(res.locals.topicList);
  }
);
//add a topic to a cluster
app.post(
  "/api/topic",
  userController.checkUserAuth,
  apiController.getClusterInfo,
  apiController.addTopic,
  (req, res) => {
    return res.status(201).json("topic added");
  }
);
//remove a topic from a cluster
app.delete(
  "/api/topic",
  userController.checkUserAuth,
  apiController.getClusterInfo,
  apiController.deleteTopic,
  (req, res) => {
    return res.status(202).json("topic deleted");
  }
);

app.get(
  "/api/metric",
  userController.checkUserAuth,
  metricController.decryptKeys,
  metricController.fetchData,
  userController.addMetrics,
  (req, res) => {
    return res.json(res.locals.metric);
  }
);
//catch-all that sends index.html file to client-side
// app.get('/*', (req, res) => {
//   console.log('here');
//   res.sendFile(path.resolve(__dirname, '../dist/index.html'));
// });

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 400,
    message: { err: "Unknown error occurred" }
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log("Global error handler caught: ", errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
