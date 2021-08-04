const newrelic = require('newrelic');

const express = require('express');
const app = express();
const path = require('path');
// const bodyParser = require('body-parser');
// const axios = require('axios');
const createProxyMiddleware = require('http-proxy-middleware');

const PORT = 3000;
const API_PRODUCT_INFORMATION_URL = 'http://localhost:3001';

// app.use(bodyParser.json());

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
  res.sendFile(path.join(__dirname, '/./public/index.html'));
});

// Product Information service
app.use('/Information', createProxyMiddleware({
  target: API_PRODUCT_INFORMATION_URL
}));

// app.get('/Information/:productId', (req, res) => {
//   axios.get(`${API_PRODUCT_INFORMATION_URL}/${req.params.productId}`)
//     .then((results) => res.json(results.data))
//     .catch((err) => console.log('Product Information GET error:', err));
// });

// app.post('/Information', (req, res) => {
//   let data = req.body;
//   axios.post(API_PRODUCT_INFORMATION_URL, data)
//     .then((result) => res.json(result.data))
//     .catch((error) => console.log('Product Information POST error:', error));
// });




app.listen(PORT, () => {
  console.log(`Proxy server now listening at http://localhost:${PORT}`);
});
