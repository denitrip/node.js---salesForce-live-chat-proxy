const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const source_url = 'https://d.la2-c2-ukb.salesforceliveagent.com';

app.use(bodyParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  next();
});

app.get('/getToken', (req, res) => {
  console.log('working with /getToken');
  axios.get(`${source_url}/chat/rest/System/SessionId`,
    {headers: {"X-LIVEAGENT-AFFINITY": 'null', "X-LIVEAGENT-API-VERSION": '47'}, withCredentials: true})
    .then(response => response.data)
    .then(response =>{
      res.send(response)
  }) .catch(error => res.status(error.response.status).send(error.response.statusText));
});

app.post('/startSession', (req, res) => {
  console.log('working with /startSession');
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
    payLoad, {headers: headers} ).then(response => response.data).then(response => res.send({'status': 'OK'}))
    .catch(error => res.status(error.response.status).send(error.response.statusText));
});

app.get('/getMessages', (req, res) => {
  console.log('working with /getMessages');
  const headers = {
    'X-LIVEAGENT-API-VERSION': '47',
    "X-LIVEAGENT-AFFINITY": req.query.session_token,
    'X-LIVEAGENT-SESSION-KEY': req.query.session_key,
    'X-LIVEAGENT-SEQUENCE': '1',
    'Content-Type': 'application/json'
  };
  const params = {
    'ack': req.query.session_ack
  };
  axios.get(`${source_url}/chat/rest/System/Messages`,
    {headers: headers, params: params})
    .then(response => response.data)
    .then(response =>{
      res.send(response)
    }) .catch(error => res.status(error.response.status).send(error.response.statusText));
});

app.get('/reconnectSession', (req, res) => {
  console.log('working with /reconnectSession');
  const headers = {
    'X-LIVEAGENT-API-VERSION': '47',
    "X-LIVEAGENT-AFFINITY": req.query.session_token,
    'X-LIVEAGENT-SESSION-KEY': req.query.session_key,
    'Content-Type': 'application/json'
  };
  const params = {
    'ReconnectSession.offset': req.query.session_offset
  };
  axios.get(`${source_url}/chat/rest/System/ReconnectSession`,
    {headers: headers, params: params})
    .then(response => response.data)
    .then(response =>{
      res.send(response)
    }) .catch(error => res.status(error.response.status).send(error.response.statusText));
});

app.post('/sendMessage', (req, res) => {
  console.log('working with /sendMessage');
  const headers = {
    'X-LIVEAGENT-API-VERSION': '47',
    "X-LIVEAGENT-AFFINITY": req.body.session_token,
    'X-LIVEAGENT-SESSION-KEY': req.body.session_key,
    'Content-Type': 'application/json'
  };
  const payLoad = {
    'text': req.body.text
  };
  axios.post(`${source_url}/chat/rest/Chasitor/ChatMessage`,
    payLoad, {headers: headers} ).then(response => response.data).then(response => res.send({status: 'OK'}))
    .catch(error => res.status(error.response.status).send(error.response.statusText));
});

app.post('/resyncState', (req, res) => {
  console.log('working with /resyncState');
  const headers = {
    'X-LIVEAGENT-API-VERSION': '47',
    "X-LIVEAGENT-AFFINITY": req.body.session_token,
    'X-LIVEAGENT-SESSION-KEY': req.body.session_key,
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
  axios.post(`${source_url}/chat/rest/Chasitor/ChasitorResyncState`,
    payLoad, {headers: headers} ).then(response => response.data).then(response => res.send({status: 'OK'}))
    .catch(error => res.status(error.response.status).send(error.response.statusText));
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
console.log(`/reconnectSession`);
console.log(`/resyncState`);
console.log(`====================================`);



