import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 200,
  rps: 100,
  duration: '30s',
};

// Max records 49999995
// Randomly return records from last 2% of db
let id = Math.floor(Math.random() * 1000000) + 48999995;

export default function() {
  let res = http.get(`http://localhost:3001/reviews/all/4999990${id}`);

  check(res, {
    'status was 200': r => r.status === 200,
    'transaction time OK': r => r.timings.duration < 100,
  });

  sleep(1);
}
