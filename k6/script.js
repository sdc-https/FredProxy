import http from 'k6/http';
import { sleep } from 'k6';
const sampleDataForOneProduct = {
  cast: [
    'Jordan Acevedo',
    'Aschale Siyoum',
    'Christopher Raffaele',
    'Fred Rosselet'
  ],
  aspectRatio: '2:1',
  rating: 'HR',
  dimensions: '4 x 0 x 2 Inches',
  format: 'Zoom Screen',
  runTime: '8 weeks',
  studio: 'RPT Studios',
  numberOfDisks: 88
};

const BASE_URL = 'http://localhost:3000';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 100,
      maxVUs: 500
    }
  }
};

export default () => {
  // const min = 9000000;
  // const max = 10000000;
  // let id = Math.floor(Math.random() * (max - min + 1) + min);
  // http.get(`${BASE_URL}/Information/${id}`);
  // sleep(1);

  http.post(`${BASE_URL}/Information`, JSON.stringify(sampleDataForOneProduct), { headers: {'Content-Type': 'application/json' } });
  sleep(1);
};