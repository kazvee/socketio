const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

const port = 9001;

// Step 1 - Require Socket io
const socketio = require('socket.io');

// Step 2 - Require HTTPS
const http = require('http');

// Step 3 - Wrap the app in the HTTP
const server = http.createServer(app);

// Step 4 - Make sure you have io wrap over the server
const io = socketio(server);

app.get('/', (req, res) => {
  res.send('Welcome! 🌞');
});

io.on('connection', (socket) => {
  console.log('Someone has connected! 🤠');
  setInterval(() => {
    // Sending to the client
    // After the .emit('Name of the Message', 'Additional things we can send!', 3, 4, 'etc');
    socket.emit('firstMessage', 'Welcome! 🌚 ');
  }, 2000);
});

server.listen(port, () => {
  console.log(`App is listening on port ${port}! 😃`);
});
