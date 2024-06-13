const WebSocket = require('ws');
const https = require('node:https');
const fs = require('node:fs');
const http = require('http');
const url = require('url');

var messageList = [];

const options = {

        key: fs.readFileSync("/link_to_ur_key"),
        cert: fs.readFileSync("link_to_ur_cert"),
}

const server = https.createServer(options, (req, res) => {
  const pathname = url.parse(req.url).pathname;

  if (pathname === '/ws') {

    const ws = new WebSocket.Server({ server, path: '/ws' });

    ws.on('connection', (ws) => {
      console.log('Client connected');

      ws.on('message', (message) => {
        if (message) {
          const requestBody = message.toString().substring(5);
          console.log(`Received POST request with body => ${requestBody}`);
          messageList.push(requestBody);
          ws.send(`POST response: ${messageList}`);
       }
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(123, () => {
  console.log('Server listening on port 8080');
});

