import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 50,
  rps: 10000,
  duration: '60s',
};

// Test server 1
// const serverUrl = 'http://ec2-18-223-110-171.us-east-2.compute.amazonaws.com:3001';

// Proxy
const serverUrl = 'http://ec2-18-222-43-134.us-east-2.compute.amazonaws.com'; 

// Randomly return records from last 2% of db
let productId = Math.floor(Math.random() * 1300) + 9998700;

export default function() {
  let res = http.get(`${serverUrl}/reviews/all/${productId}`);

   check(res, {
    'status was 200': r => r.status === 200,
    'transaction time OK': r => r.timings.duration < 100,
  });
}
