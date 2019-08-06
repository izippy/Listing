import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "10s", target: 100 },
    { duration: "10s", target: 200 },
    { duration: "10s", target: 300 },
    { duration: "20s", target: 400 },
    { duration: "20s", target: 500 },
    { duration: "20s", target: 600 },
    { duration: "20s", target: 700 },
    { duration: "2m30s", target: 800 },
    { duration: "1m0s", target: 700 },
    { duration: "10s", target: 600 },
    { duration: "10s", target: 500 },
    { duration: "10s", target: 400 },
    { duration: "10s", target: 300 },
    { duration: "10s", target: 200 },
    { duration: "10s", target: 100 },
  ],
  discardResponseBodies: true,
  throw: true,
};

export default function() {
  let randomget = Math.floor((Math.random() * 10000000) + 1);
  let res = http.get(`http://localhost:3005/${randomget}`);

  // let randompost = Math.floor(Math.random() * (20000000) + 10000001);
  // let payload = JSON.stringify({ id: `${randompost}`, categories: 'Basic', item: 'Wifi', itemdescription: 'Continuous access in the listing' });
  // let params =  { headers: { "Content-Type": "application/json" } }
  // let res = http.post('http://localhost:3005/listing/amenity/:listingID');

  check(res, {
    "status was 200": (r) => r.status == 200,
  });
  sleep(1);
};