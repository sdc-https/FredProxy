const newrelic = require('newrelic');
const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
// const morgan = require('morgan');
const createProxyMiddleware = require('http-proxy-middleware');

const port = 3000;
const proxyURL = `http://${process.env.HOST}:${port}`
const informationURL = `http://${process.env.INFORMATION_HOST}:3001`
const overviewURL = `http://${process.env.OVERVIEW_HOST}:3002`
const galleryURL = `http://${process.env.GALLERY_HOST}:3003`
const reviewsURL = `http://${process.env.REVIEWS_HOST}:3004`


// app.use(morgan('tiny'));
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
  target: informationURL
}));

// Product Overview service
// app.use('/Overview', createProxyMiddleware({
//   target: overviewURL
// }));

// Product Gallery service
// app.use('/Gallery', createProxyMiddleware({
//   target: galleryURL
// }));

// Product Reviews service
// app.use('/Reviews', createProxyMiddleware({
//   target: reviewsURL
// }));




app.listen(port, () => {
  console.log(`Proxy server now listening at http://${process.env.HOST}:${port}`);
});
