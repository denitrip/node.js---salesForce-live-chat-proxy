# node.js---salesForce-live-chat-proxy

1. run npm install
2. nodemon index.js

you may use next URLs

1. <b>/getToken</b> (GET)
    NO PARAMS

- in order to retrieve access token, session id and session key

2. /startSession (POST)
  params (body) - 
    1. session_token
    2. session_key
    3. session_id
in JSON format {}

- will return "OK" message (method start the session with agent)

3. /getMessages (GET)
  params (query params) - 
     1. session_token
     2. session_key
     
- in order to download the messages from agent

4. /sendMessage (POST)
  params(body) - 
      1. session_token
      2. session_key
      3. text
  in JSON format {}
  
  - in order to send text message to agent.
  
  
  don't forget to update expiring session key
