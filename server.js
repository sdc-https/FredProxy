const newrelic = require('newrelic');

const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const createProxyMiddleware = require('http-proxy-middleware');

const host = process.env.HOST || 'localhost';
const port = process.env.PROXY_PORT || 3000;
const informationPort = process.env.INFORMATION_PORT || 3001;
const API_PRODUCT_INFORMATION_URL = `http://${host}:${informationPort}`;

app.use(morgan('tiny'));
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




app.listen(port, () => {
  console.log(`Proxy server now listening at http://${host}:${port}`);
});
