const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const source_url = 'https://d.la2-c2-ukb.salesforceliveagent.com';

app.use(bodyParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/getToken', (req, res) => {
  axios.get(`${source_url}/chat/rest/System/SessionId`,
    {headers: {"X-LIVEAGENT-AFFINITY": 'null', "X-LIVEAGENT-API-VERSION": '47'}, withCredentials: true})
    .then(response => response.data)
    .then(response =>{
      res.send(response)
  });
});

app.post('/startSession', (req, res) => {
  const headers = {
    'X-LIVEAGENT-API-VERSION': '47',
    "X-LIVEAGENT-AFFINITY": req.body.session_token,
    'X-LIVEAGENT-SESSION-KEY': req.body.session_key,
    'X-LIVEAGENT-SEQUENCE': '1',
    'Content-Type': 'application/json'
  };
  const payLoad = {
    "organizationId":"00D2w000001NTbv",
    "deploymentId":"5722w000000GpDH",
    "buttonId":"5732w000000GpPk",
    "sessionId": req.body.session_id,
    "userAgent":"Lynx/2.8.8",
    "language":"en-US",
    "screenResolution":"1900x1080",
    "visitorName":"Hello, it's me!",
    "prechatDetails":[],
    "prechatEntities":[],
    "receiveQueueUpdates":"true",
    "isPost":"true"
  };
  axios.post(`${source_url}/chat/rest/Chasitor/ChasitorInit`,
    payLoad, {headers: headers} ).then(response => response.data).then(response => res.send(response));
});

app.get('/getMessages', (req, res) => {
  const headers = {
    'X-LIVEAGENT-API-VERSION': '47',
    "X-LIVEAGENT-AFFINITY": req.query.session_token,
    'X-LIVEAGENT-SESSION-KEY': req.query.session_key,
    'X-LIVEAGENT-SEQUENCE': '1',
    'Content-Type': 'application/json'
  };
  axios.get(`${source_url}/chat/rest/System/Messages`,
    {headers: headers})
    .then(response => response.data)
    .then(response =>{
      res.send(response)
    });
});

app.post('/sendMessage', (req, res) => {
  const headers = {
    'X-LIVEAGENT-API-VERSION': '47',
    "X-LIVEAGENT-AFFINITY": req.body.session_token,
    'X-LIVEAGENT-SESSION-KEY': req.body.session_key,
    'Content-Type': 'application/json'
  };
  const payLoad = {
    'text': req.body.text
  };
  console.log(req.body.text);
  axios.post(`${source_url}/chat/rest/Chasitor/ChatMessage`,
    payLoad, {headers: headers} ).then(response => response.data).then(response => res.send(response));
});

app.get('/', (req, res) => {
  res.sendFile('/index.html', {root: __dirname });
});

app.listen(port, () => console.log(`backend listening http://localhost:${port}`));
console.log(`====================================`);
console.log(`/startSession`);
console.log(`/getToken`);
console.log(`/getMessages`);
console.log(`/sendMessage`);
console.log(`====================================`);



