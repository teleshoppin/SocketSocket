const WebSocket = require('ws');
const readline = require('readline');

const ws = new WebSocket('wss://YOUR_URL:123/ws'); // Replace with the WebSocket URL

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

ws.on('open', () => {
  console.log('Connected to WebSocket');

  rl.setPrompt('> ');
  rl.prompt();

  rl.on('line', (line) => {
    ws.send(`POST ${line}`);
    rl.prompt();
  });

  rl.on('close', () => {
    ws.close();
    process.exit(0);
  });
});

ws.on('message', (message) => {
  console.log(`Received message: ${message}`);
});

ws.on('error', (error) => {
  console.error(`Error occurred: ${error}`);
});

ws.on('close', () => {
  console.log('WebSocket connection closed');
  process.exit(0);
});
