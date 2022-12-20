const express = require('express');
const session = require('express-session');
const path = require('path');
const PORT = 3000;

const mongodb = require('mongoose');
const MONGO_URI = require('./credentials');

const cloudAuthController = require('./controllers/cloud-auth-controller');
const userController = require('./controllers/user-controller');

const app = express();
app.use(express.json());

mongodb.connect(MONGO_URI);
// to parse incoming json objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use(
  session({
    secret: 'test',
    saveUninitialized: true,
    cookie: { maxAge: 50000 },
    resave: false,
  })
);

app.use(
  '/api/login',
  userController.verifyUser,
  userController.authorizeUser,
  (req, res, next) => {
    // console.log(req.sessionID);
    res.status(200).json(res.locals.user);
  }
);

app.get('/api/authenticate', userController.authorizeUser, (req, res, next) => {
  res.status(200).json(req.session);
})

app.get('/api/logout', userController.logOut, (req, res, next) => {
  console.log('user logged out');
  res.status(200).json();
})

// testing endpoint for sign up
app.use(
  '/api/signup',
  userController.createUser,
  userController.authorizeUser,
  (req, res, next) => {
    res.send(200).json(res.locals.user);
  }
);

// app.get('/', (req, res) => {
//   console.log('WE ARE HERE');
//   res.sendFile(path.resolve(__dirname, '../dist/index.html'));
// });
//requests to server go here
app.post(
  '/api/cloud-auth',
  cloudAuthController.encryptCredentials,
  userController.addCloudCluster,
  (req, res) => {
    return res.json(res.locals.credentials);
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
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'Unknown error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log('Global error handler caught: ', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
