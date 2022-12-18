const express = require('express');
const session = require('express-session');
const path = require('path');
const PORT = 3000;
const cloudAuthController = require('./controllers/cloud-auth-controller');

const app = express();
app.use(express.json());

// to parse incoming json objects 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use(session({
  secret: 'test',
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 50000 },
  resave: false
}))

app.use('/api/login', (req, res, next) => {
  console.log('in login');
  console.log(req.session);
  console.log(req.sessionID);
  res.status(200).json('Daria');
})

// testing endpoint for sign up
app.use('/api/signup', (req, res, next) => {
  res.sendStatus(200);
})

// app.get('/', (req, res) => {
//   console.log('WE ARE HERE');
//   res.sendFile(path.resolve(__dirname, '../dist/index.html'));
// });
//requests to server go here
app.post('/api/cloud-auth', cloudAuthController.encryptCredentials, (req, res) => {
  return res.json(res.locals.credentials);
});

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
