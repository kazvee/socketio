const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
const random = require('random-name');

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

let users = [];

io.on('connection', (socket) => {
  const name = random();
  users.push(name);
  // socket.emit('users', users);
  // The above to send users to the frontend is fine and would be feasible, but we can send it all in one payload:
  socket.emit('name', { name, users });
  // sending to all clients except sender
  socket.broadcast.emit('NEW_USER', name);
  console.log('Someone has connected! 🤠');
  // Sending to the client
  // After the .emit('Name of the Message', 'Additional things we can send!', 3, 4, 'etc');
  socket.emit('firstMessage', 'Welcome! 🌚');

  // Not recommended to do this because name is not 100% random, only the ID provided in socket will be 100% random:
  socket.name = name;

  socket.on('disconnect', () => {
    console.log('User has left! 👋');
    users = users.filter((name) => name !== socket.name);
    socket.broadcast.emit('DISCONNECT', socket.name);
  });
});

server.listen(port, () => {
  console.log(`App is listening on port ${port}! 😃`);
});

// Tips: When testing in 2 browser windows:
// When window 2 is fine, and the window 1 has an issue, use broadcast.
// When both windows have an issue, use emit.
