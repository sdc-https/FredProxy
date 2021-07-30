import http from 'k6/http';
import { sleep } from 'k6';
const BASE_URL = 'http://localhost:3001';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 100,
      maxVUs: 200
    },
  },
};

export default function () {
  http.get(`${BASE_URL}/dp/9999999`);
  sleep(1);
};