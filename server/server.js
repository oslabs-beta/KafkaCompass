const express = require('express');
const path = require('path');
const PORT = 3000;

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/', (req, res) => {
  console.log('WE ARE HERE');
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

//requests to server go here

//catch-all that sends index.html file to client-side
app.get('/*', (req, res) => {
  console.log('here');
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
