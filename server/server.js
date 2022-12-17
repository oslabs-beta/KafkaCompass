const express = require('express');
const session = require('express-session');
const path = require('path');
const PORT = 3000;

const app = express();

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
  console.log('in server');
  console.log(req.session);
  console.log(req.sessionID);
  res.status(200).json('Daria');
})

// app.get('/', (req, res) => {
//   console.log('WE ARE HERE');
//   res.sendFile(path.resolve(__dirname, '../dist/index.html'));
// });
//requests to server go here

//catch-all that sends index.html file to client-side
// app.get('/*', (req, res) => {
//   console.log('here');
//   res.sendFile(path.resolve(__dirname, '../dist/index.html'));
// });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
