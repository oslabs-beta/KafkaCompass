const express = require('express');
const path = require('path');
const PORT = 3000;
const cloudAuthController = require('./controllers/cloud-auth-controller');

const app = express();
app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
  console.log('WE ARE HERE');
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

//requests to server go here
app.post('/api/cloud-auth', cloudAuthController.encryptCredentials, (req, res) => {
  return res.json(res.locals.credentials);
});

//catch-all that sends index.html file to client-side
app.get('/*', (req, res) => {
  console.log('here');
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
