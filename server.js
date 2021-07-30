const newrelic = require('newrelic');

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  next();
});

app.get('*/dp/:productId', (req, res) => {
  res.sendFile(path.join(__dirname, '/./public/index.html'));
});

app.get('/:productId', (req, res) => {
  res.sendFile(path.join(__dirname, '/./public/index.html'))
});

app.listen(port, () => {
  console.log(`Server now listening at http://localhost:${port}`);
});
